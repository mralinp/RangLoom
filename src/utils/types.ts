interface Recipe {
  id: string;
  image: string;
  sampleArea: { x: number; y: number }[];
  colorPalette: Pallet;
  createdAt: string;
  updatedAt: string;
}

interface Pallet {
  id: string;
  author: string;
  name: string;
  colors: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type { Recipe, Pallet, User };
