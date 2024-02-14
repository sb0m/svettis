import { Exercise } from "../types/types";

const ObliqueTwistSquat: Exercise = {
  id: 424242,
  name: "Oblique Twist Squat",
  duration: 50,
  repetition: 3,
  break: 10,
  image: null,
  imageAsset: "ObliqueTwistSquat.png",
  description: "",
  undeletable: true,
};

const MountainClimbers: Exercise = {
  id: 424243,
  name: "Mountain Climbers",
  duration: 50,
  repetition: 3,
  break: 10,
  image: null,
  imageAsset: "MountainClimbers.png",
  description: "",
  undeletable: true,
};

const BirdDog: Exercise = {
  id: 424244,
  name: "Bird Dog",
  duration: 50,
  repetition: 3,
  break: 10,
  image: null,
  imageAsset: "BirdDog.png",
  description: "",
  undeletable: true,
};

const ElbowPlankRaise: Exercise = {
  id: 42425,
  name: "Elbow Plank Raise",
  duration: 40,
  repetition: 2,
  break: 20,
  image: null,
  imageAsset: "ElbowPlankRaise.png",
  description:
    "Start with plank on hands, down with one arm on elbow, then with the other. After that on the hands again and so on",
  undeletable: true,
};

const Swimming: Exercise = {
  id: 42426,
  name: "Elbow Plank Raise",
  duration: 40,
  repetition: 2,
  break: 20,
  image: null,
  imageAsset: "Swimming.png",
  description:
    "Lay on belly, tension in back & legs. Raise head. Alternate raising opposite leg arm at the same time.",
  undeletable: true,
};

const SideToSideOblique: Exercise = {
  id: 42427,
  name: "Side To Side Oblique",
  duration: 40,
  repetition: 2,
  break: 20,
  image: null,
  imageAsset: "SideToSideOblique.png",
  description: "If too heavy put legs on the floor",
  undeletable: true,
};

const DeadBug: Exercise = {
  id: 42428,
  name: "Dead Bug",
  duration: 40,
  repetition: 2,
  break: 20,
  image: null,
  imageAsset: "DeadBug.png",
  description: "",
  undeletable: true,
};

const GeneralStretch: Exercise = {
  id: 42429,
  name: "General Stretch",
  duration: 300,
  repetition: 1,
  break: 0,
  image: null,
  imageAsset: "GeneralStretch.png",
  description: "",
  undeletable: true,
};

const ToeLift: Exercise = {
  id: 42430,
  name: "Toe Lift",
  duration: 60,
  repetition: 2,
  break: 10,
  image: null,
  imageAsset: "ToeLift.png",
  description: "If possible with weight",
  undeletable: true,
};

const SplitSquat: Exercise = {
  id: 42431,
  name: "Split Squat",
  duration: 30,
  repetition: 6,
  break: 10,
  image: null,
  imageAsset: "SplitSquat.png",
  description: "3 times each leg",
  undeletable: true,
};

const HipLift: Exercise = {
  id: 42432,
  name: "Hip Lift",
  duration: 30,
  repetition: 6,
  break: 10,
  image: null,
  imageAsset: "HipLift.png",
  description: "With some weight, 3 times each leg",
  undeletable: true,
};

const TrizepsDips: Exercise = {
  id: 42434,
  name: "Trizeps Dips",
  duration: 40,
  repetition: 3,
  break: 20,
  image: null,
  imageAsset: "TrizepsDips.png",
  description: "Can be done sitting if too hard",
  undeletable: true,
};

const PushUps: Exercise = {
  id: 42435,
  name: "Push Ups",
  duration: 40,
  repetition: 1,
  break: 0,
  image: null,
  imageAsset: "PushUp.png",
  description: "",
  undeletable: true,
};

const BearPlank: Exercise = {
  id: 42436,
  name: "Bear Plank",
  duration: 40,
  repetition: 3,
  break: 20,
  image: null,
  imageAsset: "BearPlank.png",
  description: "",
  undeletable: true,
};

const HighCrunches: Exercise = {
  id: 42437,
  name: "High Crunches",
  duration: 40,
  repetition: 2,
  break: 20,
  image: null,
  imageAsset: "HighCrunches.png",
  description: "",
  undeletable: true,
};

export const exercises = [
  ObliqueTwistSquat,
  MountainClimbers,
  BirdDog,
  ElbowPlankRaise,
  Swimming,
  SideToSideOblique,
  DeadBug,
  GeneralStretch,
  ToeLift,
  SplitSquat,
  HipLift,
  TrizepsDips,
  PushUps,
  BearPlank,
  HighCrunches,
];
