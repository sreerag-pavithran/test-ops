import { message } from "antd";
import axios from "axios";
import AxiosInstance from "../../../utils/axios";
import { API_URL } from "../../../utils/url";
import { ProjectType } from "../../actionTypes/";

const {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  PROJECT_API_CALL,
  PROJECT_API_CALL_OFF,
  PROJECT_API_LOADER_ON,
  PROJECT_API_LOADER_OFF,
  CURRENT_PROJECT_INFO,
} = ProjectType;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const GetAllProjectsByCurrentUser = () => {
  return async (dispatch) => {
    dispatch({ type: PROJECT_API_LOADER_ON });
    dispatch({ type: GET_ALL_PROJECT_REQUEST });
    const response = await AxiosInstance.get(
      `/get-all-projects-of-current-user`
    );
    response?.status && dispatch({ type: PROJECT_API_LOADER_OFF });
    if (response?.status === 201) {
      const projects = response?.data?.data;
      const length = response?.data?.length;

      dispatch({
        type: GET_ALL_PROJECT_SUCCESS,
        payload: { projects, length },
      });
    } else {
      if (response.status === 400 || response.status === 404) {
        dispatch({
          type: GET_ALL_PROJECT_FAILURE,
          payload: { error: response.data.error },
        });
      }
    }
  };
};

export const GetCurrenntProjectDetails = () => {
  return async (dispatch) => {
    const currentProject = localStorage.getItem("currentProject");
    const response = await AxiosInstance.get(
      `/get-all-tasks-by-project-id/${currentProject}`
    );
    if (response?.status === 201) {
      console.log(response);

      dispatch({
        type: CURRENT_PROJECT_INFO,
        // payload: { projects, length },
      });
    } else {
      if (response.status === 400 || response.status === 404) {
        dispatch({
          type: GET_ALL_PROJECT_FAILURE,
          payload: { error: response.data.error },
        });
      }
    }
  };
};

export const FetchAllTasksOfProject = () => {
  return async (dispatch) => {
    const currentProject = localStorage.getItem("currentProject");
    const response = await AxiosInstance.get(
      `/get-all-tasks-by-project-id/${currentProject}`
    );
    if (response?.status === 201) {
      console.log(response);

      dispatch({
        type: CURRENT_PROJECT_INFO,
        // payload: { projects, length },
      });
    } else {
      if (response.status === 400 || response.status === 404) {
        dispatch({
          type: GET_ALL_PROJECT_FAILURE,
          payload: { error: response.data.error },
        });
      }
    }
  };
};

export const AddProjectAction = (form) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  dispatch({
    type: PROJECT_API_CALL_OFF,
  });
  const res = await axios
    .post(
      `${API_URL}/create-project`,
      {
        ...form,
      },
      config
    )
    .then((res) => {
      console.log(res);
      const { data } = res;
      data && dispatch(GetAllProjectsByCurrentUser());
      data && window.location.replace("/projects");
      data &&
        dispatch({
          type: PROJECT_API_CALL,
          payload: {
            title: "🎉 New project created",
            status: data?.status,
            apiCalled: true,
          },
        });
    })
    .catch((err) => {
      message.error(err?.response?.data?.msg);
    });
};

export const LeaveProject = (ownerID, projectID) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/leave-project/${projectID}`,
      { owner: ownerID },
      config
    );
    console.log(res);
    !res?.data?.status && message.error(res?.data?.msg);
    res?.data?.status && window.location.reload();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// export const AddProjectAction = (form) => {
//   return async (dispatch) => {
//     console.log("API CALLINF");
//     dispatch({ type: ADD_PROJECT_REQUEST });
//     const response = await AxiosInstance.post(`/create-project`, {
//       ...form,
//     });
//     console.log("response", response);
//     // if (response?.status === 201) {
//     //   const project = response?.data?._project;
//     //   const message = response?.data?.status;

//     //   dispatch({
//     //     type: ADD_PROJECT_SUCCESS,
//     //     payload: { project, message },
//     //   });
//     // } else {
//     //   if (response.status === 400 || response.status === 404) {
//     //     dispatch({
//     //       type: ADD_PROJECT_FAILURE,
//     //       payload: { error: response.data.error },
//     //     });
//     //   }
//     // }
//   };
// };
