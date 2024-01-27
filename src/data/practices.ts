import { Practice } from "../types/types";
import { exercises } from "./exercises";

export const practice1: Practice = {
  name: "practice1",
  break: 10,
  exercises: [exercises[1], exercises[2]],
};

export const practice2: Practice = {
  name: "practice2",
  break: 10,
  exercises: [...exercises],
};

export const practice3: Practice = {
  name: "practice3",
  break: 20,
  exercises: [...exercises],
};

export const practices = [practice1, practice2, practice3];
