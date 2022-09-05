import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockData),
  });
});

afterEach(() => jest.clearAllMocks());

const VALUE_INPUT = 'value-input';

describe('Testando a pagina Wallet', () => {
  test('Verifica se a rota está correta', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Verifica se o email, valor total e moeda são renderizados no Header corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByTestId('email-field');
    const currency = screen.getByTestId('total-field');
    const code = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(code).toBeInTheDocument();
  });

  test('Verifica se os titulos da WalletForm foi renderizado corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const description = screen.getAllByText(/descrição/i);
    const tag = screen.getAllByText(/tag/i);
    const method = screen.getByText(/método de pagamento/i);
    const value = screen.getAllByText(/valor/i);
    const currency = screen.getAllByText(/moeda/i);
    const currentValue = screen.getByText(/câmbio utilizado/i);
    const convertedValue = screen.getByText(/moeda de conversão/i);
    const editDelete = screen.getByText('Editar/Excluir');

    expect(description[1]).toBeInTheDocument();
    expect(tag[1]).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value[1]).toBeInTheDocument();
    expect(currency[1]).toBeInTheDocument();
    expect(currentValue).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(editDelete).toBeInTheDocument();
  });

  test('Verifica se o total esta sendo atualizado corretamente no Header', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_INPUT);
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '5');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');
    userEvent.type(description, 'Mercado');
    userEvent.click(button);

    const totalValue = screen.getByTestId('total-field');

    await waitFor(() => {
      expect(totalValue.innerHTML).toBe('23.77');
    });
  });

  test('Verifica se a despesa está sendo adicionada corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_INPUT);
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '5');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Lazer');
    userEvent.type(description, 'Mercado');
    userEvent.click(button);

    await waitFor(() => {
      const resultDescription = screen.getByText('Mercado');
      const resultTag = screen.getByText('Lazer');
      const resultMethod = screen.getByText('Cartão de crédito');
      const resultValue = screen.getByText('5.00');
      const resultCurrency = screen.getByText('Dólar Americano/Real Brasileiro');
      const resultCurrentValue = screen.getByText('4.75');
      const resultConvertedValue = screen.getAllByText('23.77');

      expect(resultDescription).toBeInTheDocument();
      expect(resultTag).toBeInTheDocument();
      expect(resultMethod).toBeInTheDocument();
      expect(resultValue).toBeInTheDocument();
      expect(resultCurrency).toBeInTheDocument();
      expect(resultCurrentValue).toBeInTheDocument();
      expect(resultConvertedValue[1]).toBeInTheDocument();
    });
  });

  test('Verifica se a despesa está sendo removida corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_INPUT);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(value, '5');
    userEvent.click(button);

    await waitFor(() => {
      const deleteBtn = screen.getByTestId('delete-btn');
      userEvent.click(deleteBtn);
      expect(deleteBtn).not.toBeInTheDocument();
    });
  });

  test('Verifica se ao clicar em editar é possivel alterar os valores da despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_INPUT);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(value, '5');
    userEvent.click(button);

    await waitFor(() => {
      const editBtn = screen.getByTestId('edit-btn');
      userEvent.click(editBtn);

      const editExpenseBtn = screen.getByRole('button', { name: /editar despesa/i });
      expect(editExpenseBtn).toBeInTheDocument();

      userEvent.type(value, '10');
      userEvent.click(editExpenseBtn);

      expect(editExpenseBtn).not.toBeInTheDocument();
    });
  });
});
