import { PeopleTypes } from "../../actionTypes";
const {
  PEOPLE_API_CALL,
  PEOPLE_API_CALL_OFF,
  PEOPLE_API_LOADER_OFF,
  PEOPLE_API_LOADER_ON,
  PEOPLE_API_MOADL_ON,
  PEOPLE_API_MOADL_OFF,
  PEOPLE_MOADL_ON,
  PEOPLE_MOADL_OFF,
  PEOPLE_API_DATA,
} = PeopleTypes;

const InitialState = {
  people: [],
  modalOpen: false,
  peopleLoading: false,
  peopleModal: false,
  peopleApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const PeopleReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PEOPLE_API_DATA:
      state = {
        ...state,
        people: payload?.allMember,
      };
      break;
    case PEOPLE_API_CALL:
      state = {
        ...state,
        peopleApiCall: {
          apiCalled: payload?.apiCalled,
          title: payload?.title,
          status: payload?.status ? "success" : "error",
        },
      };
      break;
    case PEOPLE_API_MOADL_ON:
      state = {
        ...state,
        modalOpen: true,
      };
      break;
    case PEOPLE_API_MOADL_OFF:
      state = {
        ...state,
        modalOpen: false,
      };
      break;
    case PEOPLE_MOADL_ON:
      state = {
        ...state,
        peopleModal: true,
      };
      break;
    case PEOPLE_MOADL_OFF:
      state = {
        ...state,
        peopleModal: false,
      };
      break;
    case PEOPLE_API_LOADER_ON:
      state = {
        ...state,
        peopleLoading: true,
      };
      break;
    case PEOPLE_API_LOADER_OFF:
      state = {
        ...state,
        peopleLoading: false,
      };
      break;
    case PEOPLE_API_CALL_OFF:
      state = {
        ...state,
        peopleApiCall: {
          apiCalled: false,
          title: "",
          status: "",
        },
      };
      break;
  }

  return state;
};
