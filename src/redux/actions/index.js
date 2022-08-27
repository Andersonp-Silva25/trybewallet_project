import getCurrence from '../../services';

export const ADD_LOGIN = 'ADD_LOGIN';
export const CURRENCES_WITHOUT_USDT = 'CURRENCES_WITHOUT_USDT';
export const GET_CURRENCE_FAIL = 'GET_CURRENCE_FAIL';
export const GET_CURRENCE_SUCCESS = 'GET_CURRENCE_SUCCESS';

export const addLogin = (value) => ({ type: ADD_LOGIN, value });

export const getCurrenceSuccess = (value) => ({
  type: GET_CURRENCE_SUCCESS,
  value,
});

export const getCurrenceThunk = () => async (dispatch) => {
  const currence = await getCurrence();
  dispatch(getCurrenceSuccess(currence));
};
