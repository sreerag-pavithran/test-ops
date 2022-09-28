import { ProjectType } from "../../actionTypes";
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
} = ProjectType;

const InitialState = {
  project: {
    title: "",
    kickOff: "",
    dueDate: "",
    owner: {},
    magic_link: "",
  },
  allProjects: [],
  totalProjects: 0,
  gettingAllProjects: false,
  gotAllProjects: false,
  isProjectAdding: false,
  isProjectAdded: false,
  loading: false,
  error: "",
  message: "",
  projectLoading: false,
  projectApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const ProjectReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PROJECT_REQUEST:
      state = {
        ...state,
        isProjectAdding: true,
      };
      break;
    case PROJECT_API_CALL:
      state = {
        ...state,
        projectApiCall: {
          apiCalled: payload?.apiCalled,
          title: payload?.title,
          status: payload?.status ? "success" : "error",
        },
      };
      break;
    case PROJECT_API_LOADER_ON:
      state = {
        ...state,
        projectLoading: true,
      };
      break;
    case PROJECT_API_LOADER_OFF:
      state = {
        ...state,
        projectLoading: false,
      };
      break;
    case PROJECT_API_CALL_OFF:
      state = {
        ...state,
        projectApiCall: {
          apiCalled: false,
          title: "",
          status: "",
        },
      };
      break;
    case ADD_PROJECT_SUCCESS:
      state = {
        ...state,
        project: payload.project,
        isProjectAdding: false,
        isProjectAdded: true,
        message: payload.message,
      };
      break;
    case ADD_PROJECT_FAILURE:
      state = {
        isProjectAdding: false,
        isProjectAdded: false,
        error: payload.error,
      };
      break;
    case GET_ALL_PROJECT_REQUEST:
      state = {
        ...state,
        gettingAllProjects: true,
      };
      break;
    case GET_ALL_PROJECT_SUCCESS:
      state = {
        ...state,
        allProjects: payload.projects,
        gettingAllProjects: false,
        gotAllProjects: true,
        totalProjects: payload.length,
      };
      break;
    case GET_ALL_PROJECT_FAILURE:
      state = {
        ...state,
        gettingAllProjects: false,
        gotAllProjects: false,
        error: payload.error,
      };
      break;
  }

  return state;
};
