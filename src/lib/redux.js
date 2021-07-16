import { switchCase } from "@babel/types";
import { createStore } from "redux";

export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
};

export function archiveTask(id) {
  return { type: actions.ARCHIVE_TASK, id };
}

export function pinTask(id) {
  return { type: actions.PIN_TASK, id };
}

function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer(actions.ARCHIVE_TASK)(state, action);
    case actions.PIN_TASK:
      return taskStateReducer(actions.PIN_TASK)(state, action);
    default:
      return state;
  }
}

const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export default createStore(reducer, { tasks: defaultTasks });
