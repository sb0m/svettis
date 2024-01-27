import { Exercise } from "../types/types";

const exercise1: Exercise = {
  name: "exercise1",
  duration: 40,
  repetition: 3,
  break: 20,
};

const exercise2: Exercise = {
  name: "exercise2",
  duration: 50,
  repetition: 2,
  break: 10,
};

const exercise3: Exercise = {
  name: "exercise3",
  duration: 30,
  repetition: 3,
  break: 30,
};

const exercise4: Exercise = {
  name: "exercise4",
  duration: 60,
  repetition: 1,
  break: 0,
};

export const exercises = [exercise1, exercise2, exercise3, exercise4];
