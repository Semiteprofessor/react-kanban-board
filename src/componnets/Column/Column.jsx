import classNames from "classnames";
import { useTaskStore } from "../../store";
import Task from "../Task/Task";
import "./Column.css";
import React, { useEffect, useRef, useState } from "react";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const { tasks, addTask, draggedTask, setDraggedTask, moveTask } =
    useTaskStore();

  const columnTasks = tasks.filter((task) => task.state === state);

  const handleSubmit = () => {
    addTask(text, state);
    setText("");
    setOpen(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDrop(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleDrop = () => {
    moveTask(draggedTask, state);
    setDraggedTask(null);
    setDrop(false);
  };
  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={handleDrag}
      onDragLeave={handleLeave}
      onDrop={handleDrop}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>
      {columnTasks.map((task) => (
        <>
          <Task title={task.title} key={task.title} />
        </>
      ))}
      {open && (
        <form onSubmit={handleSubmit}>
          <div className="modal">
            <div className="modalContent">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Column;

const RefTest = () => {
  const ref = useRef();

  useEffect(() => {
    useTaskStore.subscribe(
      (store) => store.tasks,
      (tasks) => (ref.current = tasks)
    );
  }, []);

  return ref.current;
};
