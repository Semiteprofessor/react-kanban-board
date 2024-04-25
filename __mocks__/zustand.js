import { act } from "react-dom/test-utils";
import { beforeEach, vi } from "vitest";

const { create: actualCreate } = await vi.importActual("zustand");

const storeResetFns = new Set();

export const create = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});
