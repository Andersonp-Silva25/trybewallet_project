import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, getCurrenceThunk } from '../redux/actions';

const paymentMethodsOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagsOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class AddExpenses extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenceThunk());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitExpense = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses, expenseEdit } = this.props;
    const smallId = -1;
    const largerId = 1;

    const changeValue = {
      oldValue: expenseEdit.exchangeRates[expenseEdit.currency].ask * expenseEdit.value,
      newValue: expenseEdit.exchangeRates[currency].ask * value,
    };

    const filterExpense = expenses.filter((expense) => expense !== expenseEdit);

    const newExpense = {
      ...expenseEdit,
      id: expenseEdit.id,
      value,
      description,
      currency,
      method,
      tag,
    };

    const newArrayExpense = [...filterExpense, newExpense];

    const sortedArray = newArrayExpense.sort((a, b) => {
      if (a.id < b.id) {
        return smallId;
      } if (a.id > b.id) {
        return largerId;
      }
      return 0;
    });
    dispatch(editExpense(sortedArray, changeValue));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        WalletForm
        <form onSubmit={ this.submitExpense }>
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          {' '}
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              defaultValue={ currency }
            >
              {currencies.map((newOption) => (
                <option key={ newOption } value={ newOption }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="method">
            Formas de Pagamento:
            {' '}
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              defaultValue={ method }
            >
              {paymentMethodsOptions.map((newOption) => (
                <option key={ newOption } value={ newOption }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="tag">
            Tag:
            {' '}
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              defaultValue={ tag }
            >
              {tagsOptions.map((newOption) => (
                <option key={ newOption } value={ newOption }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          {' '}
          <button type="submit">Editar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseEdit: state.wallet.expenseEdit,
});

AddExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  expenseEdit: PropTypes.shape({
    id: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
    value: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(AddExpenses);
