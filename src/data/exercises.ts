import { Exercise } from "../types/types";

const exercise1: Exercise = {
  id: 424242,
  name: "exercise1",
  duration: 40,
  repetition: 3,
  break: 20,
  image: null,
  imageAsset: "stored.png",
  description: "description description description description",
  undeletable: true,
};

const exercise2: Exercise = {
  id: 424243,
  name: "exercise2",
  duration: 50,
  repetition: 2,
  break: 10,
  image: null,
  imageAsset: "stored.png",
  description: "description description description description",
  undeletable: true,
};

const exercise3: Exercise = {
  id: 424244,
  name: "exercise3",
  duration: 30,
  repetition: 3,
  break: 30,
  image: null,
  imageAsset: "stored.png",
  description: "description description description description",
  undeletable: true,
};

const exercise4: Exercise = {
  id: 42425,
  name: "exercise4",
  duration: 60,
  repetition: 1,
  break: 0,
  image: null,
  imageAsset: "stored.png",
  description: "description description description description",
  undeletable: true,
};

export const exercises = [exercise1, exercise2, exercise3, exercise4];
