export interface Exercise {
  name: string;
  duration: number;
  repetition: number;
  break: number;
}

export interface Practice {
  name: string;
  exercises: Exercise[];
  break: number;
}
