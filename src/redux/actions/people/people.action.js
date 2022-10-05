import { message } from "antd";
import axios from "axios";
import { API_URL } from "../../../utils/url";
import { PeopleTypes } from "../../actionTypes/";

const {
  PEOPLE_API_CALL,
  PEOPLE_API_CALL_OFF,
  PEOPLE_API_LOADER_ON,
  PEOPLE_API_LOADER_OFF,
  PEOPLE_API_MOADL_ON,
  PEOPLE_API_MOADL_OFF,
  PEOPLE_API_DATA,
} = PeopleTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchPeopleApi = () => async (dispatch) => {
  try {
    dispatch({
      type: PEOPLE_API_CALL_OFF,
    });
    dispatch({
      type: PEOPLE_API_LOADER_ON,
    });
    const res = await axios.get(`${API_URL}/get-all-people`, config);
    res?.status && dispatch({ type: PEOPLE_API_LOADER_OFF });
    const {
      data: { allMember },
    } = res;
    res?.status && dispatch({ type: PEOPLE_API_DATA, payload: { allMember } });
  } catch (error) {
    console.log(error);
  }
};

export const CreateUserApi = (formData, onClose) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    dispatch({
      type: PEOPLE_API_CALL_OFF,
    });
    dispatch({
      type: PEOPLE_API_LOADER_ON,
    });
    const res = await axios.post(`${API_URL}/signup`, formData, config);
    res?.status && dispatch({ type: PEOPLE_API_LOADER_OFF });
    res && message.success(res?.data?.msg);
    res?.status && dispatch(FetchPeopleApi());
    onClose();
  } catch (error) {
    console.log(error);
  }
};

export const DeletePeople = (peopleID) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${API_URL}/delete-people/${peopleID}`,
      config
    );
    res?.data?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const DeletePeopleRole = (roleID) => async (dispatch) => {
  try {
    const res = await axios.delete(`${API_URL}/delete-role/${roleID}`, config);
    res?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePeopleRole = (roleData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${API_URL}/update-role/${roleData?._id}`,
      roleData,
      config
    );
    res?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePeople = (peopleData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${API_URL}/update-people/${peopleData?._id}`,
      peopleData,
      config
    );
    res?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
