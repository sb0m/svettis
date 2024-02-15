import { Practice } from "../types/types";
import { exercises } from "./exercises";

const StefanPractice: Practice = {
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

const ErikPractice: Practice = {
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

// const SusiCorePractice: Practice = {
//   id: 424239,
//   name: "Susi Core Practice",
//   break: 30,
//   exercises: [
//     exercises[0],
//   ],
//   undeletable: true,
// };

export const practices = [StefanPractice, ErikPractice];
