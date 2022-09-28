import { DashboardTypes } from "../../actionTypes";
const {
  DASHBOARD_API_DATA,
  DASHBOARD_API_LOADER_OFF,
  DASHBOARD_API_LOADER_ON,
  DASHBOARD_CURRENT_PROJECT,
  DASHBOARD_MILESTONE_MODAL_OFF,
  DASHBOARD_MILESTONE_MODAL_ON,
  DASHBOARD_TASK_MODAL_OFF,
  DASHBOARD_TASK_MODAL_ON,
  DASHBOARD_SET_CURRENT_MILESTONE,
  DASHBOARD_CURRENT_PROJECT_NAME,
  DASHBOARD_TASK_MODAL_VIEW_ON,
  DASHBOARD_TASK_MODAL_VIEW_OFF,
  DASHBOARD_TASK_FETCH,
} = DashboardTypes;

const InitialState = {
  dashboard: [],
  currentProject: null,
  currentProjectName: "",
  currentMileStone: "",
  dashboardLoading: false,
  taskCardModal: false,
  taskModal: false,
  mileStoneModal: false,
  singleTaskDetail: {},
  dashboardApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const DashboardReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_API_DATA:
      state = {
        ...state,
        dashboard: payload,
      };
      break;
    case DASHBOARD_API_LOADER_ON:
      state = {
        ...state,
        dashboardLoading: true,
      };
      break;
    case DASHBOARD_API_LOADER_OFF:
      state = {
        ...state,
        dashboardLoading: false,
      };
      break;
    case DASHBOARD_MILESTONE_MODAL_ON:
      state = {
        ...state,
        mileStoneModal: true,
      };
      break;
    case DASHBOARD_MILESTONE_MODAL_OFF:
      state = {
        ...state,
        mileStoneModal: false,
      };
      break;
    case DASHBOARD_TASK_MODAL_ON:
      state = {
        ...state,
        taskModal: true,
      };
      break;
    case DASHBOARD_TASK_MODAL_OFF:
      state = {
        ...state,
        taskModal: false,
      };
      break;
    case DASHBOARD_TASK_MODAL_VIEW_ON:
      state = {
        ...state,
        taskCardModal: true,
      };
      break;
    case DASHBOARD_TASK_MODAL_VIEW_OFF:
      state = {
        ...state,
        taskCardModal: false,
      };
      break;
    case DASHBOARD_CURRENT_PROJECT:
      state = {
        ...state,
        currentProject: payload,
      };
      break;
    case DASHBOARD_CURRENT_PROJECT_NAME:
      console.log(payload, "pay comning");
      state = {
        ...state,
        currentProjectName: payload,
      };
      break;
    case DASHBOARD_SET_CURRENT_MILESTONE:
      state = {
        ...state,
        currentMileStone: payload,
      };
      break;
    case DASHBOARD_TASK_FETCH:
      console.log(payload);
      state = {
        ...state,
        singleTaskDetail: payload,
      };
      break;
  }

  return state;
};
