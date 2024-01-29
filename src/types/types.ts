export interface Exercise {
  name: string;
  duration: number;
  repetition: number;
  break: number;
  image: string;
  description: string;
}

export interface Practice {
  name: string;
  // indexed DB: exercise id
  exercises: Exercise[];
  break: number;
}
