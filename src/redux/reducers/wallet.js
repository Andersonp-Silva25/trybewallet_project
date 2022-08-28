import { GET_CURRENCE_SUCCESS, ADD_EXPENSE } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCE_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.value).filter((currence) => currence !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
      total: state.total + ((Object.values(action.value.exchangeRates)
        .find((checkCurrency) => (
          checkCurrency.code === action.value.currency && checkCurrency.codein === 'BRL'
        )).ask) * action.value.value),
    };
  default:
    return state;
  }
}

export default walletReducer;
