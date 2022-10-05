import { message, message as notify } from "antd";
import axios from "axios";
import { API_URL } from "../../../utils/url";
import { DashboardTypes } from "../../actionTypes";

const {
  DASHBOARD_API_LOADER_ON,
  DASHBOARD_API_LOADER_OFF,
  DASHBOARD_API_DATA,
  DASHBOARD_TASK_MODAL_OFF,
  DASHBOARD_TASK_FETCH,
} = DashboardTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchCurrentMilestone = (projectID) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_API_LOADER_ON });
    const res = await axios.get(
      `${API_URL}/get-all-milestone-by-current-project/${projectID}`,
      config
    );
    console.log(res);
    const {
      data: {
        data: { allMilestoneByCurrentProject },
      },
    } = res;
    res?.status &&
      dispatch({
        type: DASHBOARD_API_DATA,
        payload: allMilestoneByCurrentProject,
      });
    res?.status && dispatch({ type: DASHBOARD_API_LOADER_OFF });
  } catch (error) {
    console.log(error);
  }
};

export const CreateTaskApi = (formData, comment) => async (dispatch) => {
  try {
    const currentProject = localStorage.getItem("currentProject");
    if (comment?.commentBody) {
      const res = await axios.post(`${API_URL}/add-comment`, comment, config);
      if (res?.data?.status === false) {
        return notify.error(res?.data?.message);
      }
      const response = await axios.post(
        `${API_URL}/create-task`,
        formData,
        config
      );
      response && notify.success(response?.data?.message);
      response?.data?.status && dispatch(FetchCurrentMilestone(currentProject));
      response?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
    } else {
      const res = await axios.post(`${API_URL}/create-task`, formData, config);
      res && notify.success(res?.data?.message);
      res?.data?.status && dispatch(FetchCurrentMilestone(currentProject));
      res?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
    }
  } catch (error) {
    const {
      response: { data },
    } = error;
    notify.error(data?.message);
  }
};

export const CreateMileStone = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/create-milestone`,
      formData,
      config
    );
    res?.data?.status && window.location.reload();
    !res?.data?.status && message.error(res?.data?.message);
  } catch (error) {
    console.log(error);
  }
};

export const AddComment = (formData) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    const res = await axios.post(`${API_URL}/add-comment`, formData, config);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const GetTaskByID = (taskID) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/get-task-by-id/${taskID}`, config);
    console.log(res);
    const {
      data: { task },
    } = res;
    console.log(task);
    dispatch({ type: DASHBOARD_TASK_FETCH, payload: task });
  } catch (error) {
    console.log(error);
  }
};

export const AddCustomerInfo = (formData, projectID) => async (dispatch) => {
  try {
    let payloadData = {
      customer_info: formData,
    };
    const res = await axios.put(
      `${API_URL}/update-project/${projectID}`,
      payloadData,
      config
    );
    console.log(res);
    res && res?.data?.status && message.success(res?.data?.msg);
  } catch (error) {
    console.log(error);
    message.error(error?.response?.data?.msg);
  }
};

export const DeleteProject = (projectID) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${API_URL}/delete-project/${projectID}`,
      config
    );
    res?.data?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTask = (taskID) => async (dispatch) => {
  try {
    const res = await axios.delete(`${API_URL}/delete-task/${taskID}`, config);
    res?.data?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
