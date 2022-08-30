import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseThunk, getCurrenceThunk } from '../redux/actions';

const paymentMethodsOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagsOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class AddExpenses extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
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
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    dispatch(addExpenseThunk({ id, value, currency, method, tag, description }));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
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
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

AddExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps)(AddExpenses);
