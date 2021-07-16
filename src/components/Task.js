import React from "react";
import PropTypes from "prop-types";

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => (
  <div className={`list-item ${state}`}>
    <label className="checkbox">
      <input
        type="checkbox"
        defaultChecked={state === "TASK_ARCHIVED"}
        disabled={true}
        name="checked"
      />
      <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
    </label>
    <div className="title">
      <input
        type="text"
        value={title}
        readOnly={true}
        placeholder="Input title"
      />
    </div>
    <div className="actions" onClick={(e) => e.stopPropagation()}>
      {state !== "TASK_ARCHIVED" && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => onPinTask(id)}>
          <span className="icon-star" />
        </a>
      )}
    </div>
  </div>
);
export default Task;

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    id: PropTypes.string.isRequired /** Id of the task */,
    title: PropTypes.string.isRequired /** Title of the task */,
    state: PropTypes.string.isRequired /** Current state of the task */,
  }),
  onArchiveTask: PropTypes.func /** Event to change the task to archived */,
  onPinTask: PropTypes.func /** Event to change the task to pinned */,
};
