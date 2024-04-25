import classNames from "classnames";
import "./Task.css";
import { useTaskStore } from "../../store";

const Task = ({ title }) => {
  const { tasks, removeTask, setDraggedTask } = useTaskStore();

  const taskTitle = tasks.find((task) => task.title === title);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(taskTitle.title)}
    >
      <div>{taskTitle.title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src="./trash.svg"
            alt=""
            onClick={() => removeTask(taskTitle.title)}
          />
        </div>
        <div className={classNames("status", taskTitle.state)}>
          {taskTitle.state}
        </div>
      </div>
    </div>
  );
};

export default Task;
