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
  const currentProject = localStorage.getItem("currentProject");
  if (comment?.commentBody) {
    const res = await axios.post(`${API_URL}/add-comment`, comment, config);
    // console.log(res, "COMM");
    if (res?.data?.status === false) {
      return notify.error(res?.data?.msg);
    }
    const response = await axios.post(
      `${API_URL}/create-task`,
      formData,
      config
    );
    console.log(response);
    response && notify.success(response?.data?.msg);
    response?.data?.status && dispatch(FetchCurrentMilestone(currentProject));
    response?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
  } else {
    const res = await axios
      .post(`${API_URL}/create-task`, formData, config)
      .then((response) => {
        console.log(response?.data?.msg);
        response && notify.success(response?.data?.msg);
        response?.data?.status &&
          dispatch(FetchCurrentMilestone(currentProject));
        response?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
      })
      .catch((err) => {
        notify.error(err?.response?.data?.msg);
        return;
      });
  }
};

export const UpdateTaskApi =
  (formData, comment, taskID, taskRef) => async (dispatch) => {
    try {
      const currentProject = localStorage.getItem("currentProject");
      if (comment?.commentBody) {
        let commentid;
        comment.taskRef = taskRef;
        const res = await axios
          .post(`${API_URL}/add-comment`, comment, config)
          .then((response) => {
            console.log(response, "COMMENT");
            commentid = response?.data?._comment?._id;
            delete formData?.comment;
            formData.comment = commentid;
          })
          .catch((err) => {
            console.log(err);
          });
        if (res?.data?.status === false) {
          return notify.error(res?.data?.message);
        }
        const response = await axios
          .put(`${API_URL}/update-task/${taskID}`, formData, config)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        response && notify.success(response?.data?.message);
        response?.data?.status &&
          dispatch(FetchCurrentMilestone(currentProject));
        // response?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
      } else {
        const res = await axios.put(
          `${API_URL}/update-task/${taskID}`,
          formData,
          config
        );
        res && notify.success(res?.data?.message);
        res?.data?.status && dispatch(FetchCurrentMilestone(currentProject));
        // res?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
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
