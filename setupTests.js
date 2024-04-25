import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
import Matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

expect.apply(Matchers);
afterEach(cleanup);
