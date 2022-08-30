import {
  GET_CURRENCE_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_EDIT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
  isEdit: false,
  expenseEdit: {},
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.value,
      total: state.total - action.convertedValue,
    };
  case GET_EDIT_EXPENSE:
    return {
      ...state,
      expenseEdit: action.value,
      isEdit: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.value,
      total: (state.total - action.changeValue.oldValue) + action.changeValue.newValue,
      isEdit: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
