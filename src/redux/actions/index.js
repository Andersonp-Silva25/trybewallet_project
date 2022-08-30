import getCurrence from '../../services';

export const ADD_LOGIN = 'ADD_LOGIN';
export const GET_CURRENCE_SUCCESS = 'GET_CURRENCE_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addLogin = (value) => ({
  type: ADD_LOGIN,
  value,
});

export const getCurrenceSuccess = (value) => ({
  type: GET_CURRENCE_SUCCESS,
  value,
});

export const getCurrenceThunk = () => async (dispatch) => {
  const currence = await getCurrence();
  dispatch(getCurrenceSuccess(currence));
};

export const addExpense = (value) => ({
  type: ADD_EXPENSE,
  value,
});

export const addExpenseThunk = (value) => async (dispatch) => {
  const expense = await getCurrence();
  const newObj = {
    ...value,
    exchangeRates: expense,
  };
  dispatch(addExpense(newObj));
};

export const deleteExpense = (value, convertedValue) => ({
  type: DELETE_EXPENSE,
  value,
  convertedValue,
});
