import { create } from "zustand";
import { Recipe } from "../utils/types";

interface RecipesStore {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  getRecipes: () => Recipe[];
}

export const useRecipesStore = create<RecipesStore>((set, get) => ({
  recipes: [],
  setRecipes: (recipes: Recipe[]) => set({ recipes }),
  getRecipes: () => get().recipes,
}));
