import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const VALID_EMAIL = 'xablau@email.com';
const VALID_PASSWORD = 'HakunaMatata';

describe('Testando a tela de Login', () => {
  test('Verifica se a rota do Login está correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se o titulo, os Inputs e o Botão estão aparecendo na tela', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { level: 2, name: /login/i });
    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se os Inputs e o Botão foram validados corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'xablau');
    expect(button).toBeDisabled();

    userEvent.type(email, '@xablau.com');
    expect(button).toBeDisabled();

    userEvent.type(email, '@xabl@-u');
    expect(button).toBeDisabled();

    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).not.toHaveAttribute('disable');
  });

  test('Verifica se ao clicar no botao a rota e alterada corretamente e se o email foi salvo na store', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(EMAIL_ID);
    const password = screen.getByTestId(PASSWORD_ID);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });
});
