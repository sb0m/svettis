import { Practice } from "../types/types";
import { exercises } from "./exercises";

export const StefanPractice: Practice = {
  id: 424238,
  name: "Stefan Practice",
  break: 30,
  exercises: [
    exercises[0],
    exercises[1],
    exercises[2],
    exercises[3],
    exercises[4],
    exercises[5],
    exercises[6],
    exercises[7],
  ],
  undeletable: true,
};

export const ErikPractice: Practice = {
  id: 424239,
  name: "Erik Practice",
  break: 30,
  exercises: [
    exercises[0],
    exercises[8],
    exercises[9],
    exercises[10],
    exercises[11],
    exercises[12],
    exercises[13],
    exercises[14],
    exercises[3],
    exercises[5],
    exercises[6],
    exercises[7],
  ],
  undeletable: true,
};

export const practice3: Practice = {
  id: 424244,
  name: "practice3",
  break: 20,
  exercises: [...exercises],
  undeletable: true,
};

export const practices = [StefanPractice, ErikPractice];
