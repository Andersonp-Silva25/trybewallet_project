import { ADD_LOGIN } from '../actions';

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_LOGIN:
    return action.value;
  default:
    return state;
  }
}

export default userReducer;
