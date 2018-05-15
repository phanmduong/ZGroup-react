import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function loginReducer(state = initialState.login, action) {

  switch (action.type) {
    case types.BEGIN_UPDATE_LOGIN_FORM:
      return Object.assign({}, state, {
        isLoading: true
      });
    case types.UPDATED_LOGIN_FORM:
      return Object.assign({}, state, {
        token: action.token,
        isLoading: false,
        user: action.user,
        error: false
      });
    case types.GET_USER_LOCAL:
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        error: false
      });
    case types.LOGIN_ERROR:
      return Object.assign({}, state, {
        error: true,
        isLoading: false,
        user: {
          role: -1
        }
      });
    default:
      return state;
  }
}
