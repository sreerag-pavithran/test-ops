import axios from "axios";
import { API_URL } from "../../../utils/url";
import { RolesTypes } from "../../actionTypes/";

const {
  ROLES_API_CALL,
  ROLES_API_CALL_OFF,
  ROLES_API_LOADER_ON,
  ROLES_API_LOADER_OFF,
  ROLES_API_DATA,
} = RolesTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchRolesApi = () => async (dispatch) => {
  try {
    dispatch({
      type: ROLES_API_CALL_OFF,
    });
    dispatch({
      type: ROLES_API_LOADER_ON,
    });
    const res = await axios.get(`${API_URL}/get-all-role`, config);
    res?.status && dispatch({ type: ROLES_API_LOADER_OFF });
    console.log(res);
    const {
      data: {
        data: { allRoles },
      },
    } = res;
    res?.status && dispatch({ type: ROLES_API_DATA, payload: { allRoles } });
  } catch (error) {
    console.log(error);
  }
};

export const CreateUserApi = (formData) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    dispatch({
      type: ROLES_API_CALL_OFF,
    });
    dispatch({
      type: ROLES_API_LOADER_ON,
    });
    const res = await axios.post(`${API_URL}/signup`, formData, config);
    res?.status && dispatch({ type: ROLES_API_LOADER_OFF });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const AddRole = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/add-role`, formData, config);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
