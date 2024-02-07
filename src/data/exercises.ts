import { Exercise } from "../types/types";

const exercise1: Exercise = {
  id: 0,
  name: "exercise1",
  duration: 40,
  repetition: 3,
  break: 20,
  image: "",
  description: "description description description description",
  undeletable: true,
};

const exercise2: Exercise = {
  id: 1,
  name: "exercise2",
  duration: 50,
  repetition: 2,
  break: 10,
  image: "",
  description: "description description description description",
  undeletable: true,
};

const exercise3: Exercise = {
  id: 2,
  name: "exercise3",
  duration: 30,
  repetition: 3,
  break: 30,
  image: "",
  description: "description description description description",
  undeletable: true,
};

const exercise4: Exercise = {
  id: 3,
  name: "exercise4",
  duration: 60,
  repetition: 1,
  break: 0,
  image: "",
  description: "description description description description",
  undeletable: true,
};

export const exercises = [exercise1, exercise2, exercise3, exercise4];
