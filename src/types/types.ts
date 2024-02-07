export interface Exercise {
  id: number;
  name: string;
  duration: number;
  repetition: number;
  break: number;
  image: string;
  description: string;
  undeletable: boolean;
}

export interface Practice {
  id: number;
  name: string;
  // indexed DB: exercise id
  exercises: Exercise[];
  break: number;
  undeletable: boolean;
}
