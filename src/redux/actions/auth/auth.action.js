import AxiosInstance from "../../../utils/axios";
import { AuthTypes } from "../../actionTypes/";
import { AddProjectAction } from "../../actions";
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
} = AuthTypes;

export const LoginAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const response = await AxiosInstance.post(`/signin`, {
      ...user,
    });
    console.log("Token from action", response);
    if (response?.status === 200) {
      const { token, user } = response?.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      if (response.status === 400 || response.status === 404) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: { error: response.data.error },
        });
      }
    }
  };
};

export const SignupAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });
    const response = await AxiosInstance.post(`/signup`, {
      ...user,
    });

    if (response?.status === 200) {
      const token = response?.data.user.token;
      const user = response?.data.user._user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: { token, user },
      });
      return response;
    } else {
      if (response.status === 400 || response.status === 404) {
        dispatch({
          type: SIGN_UP_FAILURE,
          payload: { error: response.data.error },
        });
        return response;
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
    }
    dispatch({
      payload: {
        type: LOGIN_FAILURE,
        message: "User is not logged in",
      },
    });
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    const response = await AxiosInstance.post("/signout");
    if (response.status === 200) {
      localStorage.clear();
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAILURE, payload: response.data.error });
    }
  };
};
