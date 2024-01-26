export interface Exercise {
  name: string;
  duration: number;
  repetition: number;
}

export interface Practice {
  name: string;
  exercises: Exercise[];
}
