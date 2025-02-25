import { Practice } from "../types/types";
import {
  ArmRaiseWithRubberBand,
  AroundTheWorld,
  BirdDog,
  Clams,
  CurtsyLunge,
  DeadBug,
  DeadBugDiagonal,
  DumbbellSnatch,
  exercises,
  FireHydrant,
  HipLift,
  HipLiftLegDown,
  HipLiftLegUp,
  InnerThighLegLift,
  KneeTouchExtension,
  Knip,
  OverheadWeightMarch,
  PushAgainstKnee,
  PushUps,
  SingleKnip,
  ToeTap,
} from "./exercises";

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

const SusiCore: Practice = {
  id: 424251,
  name: "Susi Core",
  break: 30,
  exercises: [
    OverheadWeightMarch,
    AroundTheWorld,
    DumbbellSnatch,
    OverheadWeightMarch,
    AroundTheWorld,
    DumbbellSnatch,
    OverheadWeightMarch,
    AroundTheWorld,
    DumbbellSnatch,
    Knip,
    HipLift,
    CurtsyLunge,
    ToeTap,
    FireHydrant,
    HipLiftLegUp,
    Clams,
    HipLiftLegDown,
    KneeTouchExtension,
    InnerThighLegLift,
    DeadBug,
    PushUps,
  ],
  undeletable: true,
};

const SusiCoreDaily1: Practice = {
  id: 4242421,
  name: "Susi Core Daily 1",
  break: 15,
  exercises: [
    PushAgainstKnee,
    HipLiftLegUp,
    SingleKnip,
    HipLiftLegDown,
    SingleKnip,
    DeadBugDiagonal,
    SingleKnip,
    ArmRaiseWithRubberBand,
  ],
  undeletable: true,
};

const SusiCoreDaily2: Practice = {
  id: 4242499,
  name: "Susi Core Daily 2",
  break: 15,
  exercises: [
    PushAgainstKnee,
    SingleKnip,
    ToeTap,
    SingleKnip,
    BirdDog,
    SingleKnip,
    ArmRaiseWithRubberBand,
  ],
  undeletable: true,
};

export const practices = [
  SusiCoreDaily1,
  SusiCoreDaily2,
  SusiCore,
  ErikPractice,
  StefanPractice,
];
