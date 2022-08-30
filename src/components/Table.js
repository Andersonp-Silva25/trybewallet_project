import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  deleteButton = ({ target: { value } }) => {
    const { dispatch, expenses } = this.props;
    const deleteFilter = expenses.filter((expense) => expense.id !== Number(value));
    const valueFilter = expenses.find((expense) => expense.id === Number(value));
    const convertedValue = parseFloat(
      valueFilter.exchangeRates[valueFilter.currency].ask * valueFilter.value,
    ).toFixed(2);
    dispatch(deleteExpense(deleteFilter, convertedValue));
  };

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {
                    parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }

                </td>
                <td>
                  {
                    parseFloat(
                      (expense.exchangeRates[expense.currency].ask) * expense.value,
                    ).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.deleteButton }
                    value={ expense.id }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
