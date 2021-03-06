import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { archiveTask, pinTask } from "../lib/redux";
import Task from "./Task";

const LoadingRow = (
  <div className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading</span> <span>cool</span> <span>state</span>
    </span>
  </div>
);

const PureTaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => (
  <div className="list-items">
    {loading ? (
      <>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </>
    ) : tasks.length === 0 ? (
      <div className="wrapper-message">
        <span className="icon-check" />
        <div className="title-message">You have no tasks</div>
        <div className="subtitle-message">Sit back and relax</div>
      </div>
    ) : (
      <>
        {[
          ...tasks.filter((t) => t.state === "TASK_PINNED"),
          ...tasks.filter((t) => t.state !== "TASK_PINNED"),
        ].map((task) => (
          <Task key={task.id} task={task} {...{ onPinTask, onArchiveTask }} />
        ))}
      </>
    )}
  </div>
);
PureTaskList.propTypes = {
  loading: PropTypes.bool /** Checks if it's in loading state */,
  tasks: PropTypes.arrayOf(Task.propTypes.task)
    .isRequired /** The list of tasks */,
  onPinTask: PropTypes.func /** Event to change the task to pinned */,
  onArchiveTask: PropTypes.func /** Event to change the task to archived */,
};
PureTaskList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      (t) => t.state === "TASK_INDEX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id) => dispatch(archiveTask(id)),
    onPinTask: (id) => dispatch(pinTask(id)),
  })
)(PureTaskList);

export { PureTaskList };
