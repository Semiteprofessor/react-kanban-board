import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,
  tasksInDone: 0,
  tasksInBacklog: 0,
  addTask: async (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      // (store) => ({ tasks: [...store.tasks, { title, state }] })),
      false
    ),
  removeTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useTaskStore = create(
  subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useTaskStore.subscribe(
  (store) => store.tasks,
  (newTasks, prevTasks) => {
    useTaskStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
        .length,
    });
  }
);
