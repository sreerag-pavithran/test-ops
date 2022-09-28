import { ToDoTypes } from "../../actionTypes";
const { TODO_MENTIONS_API_DATA, TODO_API_DATA } = ToDoTypes;

const InitialState = {
  todo: [],
  mentions: [],
  todoLoading: false,
  todoApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const ToDoReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TODO_API_DATA:
      state = {
        ...state,
        todo: payload,
      };
      break;
    case TODO_MENTIONS_API_DATA:
      state = {
        ...state,
        mentions: payload?.allMentions,
      };
      break;
  }

  return state;
};
