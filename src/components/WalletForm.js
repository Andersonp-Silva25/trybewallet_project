import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenceThunk } from '../redux/actions';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenceThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="valor">
            Valor:
            {' '}
            <input
              type="text"
              id="valor"
              name="valor"
              data-testid="value-input"
            />
          </label>
          {' '}
          <label htmlFor="moeda">
            Moeda:
            {' '}
            <select id="moeda" name="moeda" data-testid="currency-input">
              {currencies.map((newOption, index) => (
                <option key={ index }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="pagamento">
            Formas de Pagamento:
            {' '}
            <select id="pagamento" name="pagamento" data-testid="method-input">
              {paymentMethods.map((newOption, index) => (
                <option key={ index }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="tag">
            Tag:
            {' '}
            <select id="tag" name="tag" data-testid="tag-input">
              {tag.map((newOption, index) => (
                <option key={ index }>{newOption}</option>
              ))}
            </select>
          </label>
          {' '}
          <label htmlFor="descricao">
            Descrição:
            {' '}
            <input
              type="text"
              id="descricao"
              name="descricao"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
