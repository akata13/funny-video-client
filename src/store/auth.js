/* eslint-disable default-param-last */
/* eslint-disable no-useless-catch */
import http from 'helpers/http';

const UPDATE_CURRENT_USER = 'auth/UPDATE_CURRENT_USER';
const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';
const LOGOUT = 'auth/LOGOUT';

export const initialState = {
  token: undefined,
  currentUser: undefined,
  isLoginModalShowing: false
};

export const updateCurrentUser = (currentUser) => ({
  type: UPDATE_CURRENT_USER,
  payload: {
    currentUser
  }
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  payload: {
    token
  }
});

export const register = (values) => async () => {
  try {
    const result = await http.post('/auth/register', values);

    return result;
  } catch (err) {
    throw err;
  }
};

export const login = (params) => async (dispatch) => {
  try {
    const result = await http.post('/auth/login', params);

    if (result.token) {
      dispatch(updateToken(result.token));
      window.token = result.token;
    }
    if (result.email) {
      dispatch(updateCurrentUser(result));
    }
    return result;
  } catch (err) {
    throw err;
  }
};

export const logout = () => ({
  type: LOGOUT
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    case LOGOUT:
      return {
        ...state,
        token: undefined,
        currentUser: undefined
      };
    default:
      return state;
  }
};
