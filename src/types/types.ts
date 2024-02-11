export interface Exercise {
  id: number;
  name: string;
  duration: number;
  repetition: number;
  break: number;
  image: File | null;
  imageAsset: string | null;
  description: string;
  undeletable: boolean;
}

export interface Practice {
  id: number;
  name: string;
  exercises: Exercise[];
  break: number;
  undeletable: boolean;
}
