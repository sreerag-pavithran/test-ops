import { AuthTypes } from "../../actionTypes";
const {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
} = AuthTypes;

const InitialState = {
  token: null,
  user: {
    fullName: "",
    username: "",
    email: "",
    role: "",
  },
  isAauthenticated: false,
  isAuthenticating: false,
  isSignedUp: false,
  isSigningIn: false,
  loading: false,
  error: "",
  message: "",
};

export const AuthReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      state = {
        ...state,
        isAuthenticating: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: payload.user,
        token: payload.token,
        isAauthenticated: true,
        isAuthenticating: false,
      };
      break;
    case LOGIN_FAILURE:
      state = {
        isAauthenticated: false,
        isAuthenticating: false,
      };
      break;
    case SIGN_UP_REQUEST:
      state = {
        ...state,
        isSigningIn: true,
      };
      break;
    case SIGN_UP_SUCCESS:
      state = {
        ...state,
        user: payload._user,
        token: payload.token,
        isSignedUp: true,
        isSigningIn: false,
        message: "You have successfully signed up",
      };
      break;
    case SIGN_UP_FAILURE:
      state = {
        ...state,
        isSignedUp: false,
        isSigningIn: false,
        error: payload.error,
      };
      break;
    case LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        ...InitialState,
        loading: false,
      };
      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        error: payload.error,
        loading: false,
      };
      break;
  }

  return state;
};
