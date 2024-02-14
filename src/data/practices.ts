import { Practice } from "../types/types";
import { exercises } from "./exercises";

export const practice1: Practice = {
  id: 424242,
  name: "practice1",
  break: 10,
  exercises: [exercises[1], exercises[2], ...exercises],
  undeletable: true,
};

export const practice2: Practice = {
  id: 424243,
  name: "practice2",
  break: 10,
  exercises: [...exercises, ...exercises],
  undeletable: true,
};

export const practice3: Practice = {
  id: 424244,
  name: "practice3",
  break: 20,
  exercises: [...exercises],
  undeletable: true,
};

export const practices = [practice1, practice2, practice3];
