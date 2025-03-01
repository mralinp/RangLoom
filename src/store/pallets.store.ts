import { create } from "zustand";
import { Pallet } from "../utils/types";

interface PalletsStore {
  pallets: Pallet[];
  setPallets: (pallets: Pallet[]) => void;
  getPallets: () => Pallet[];
}

export const usePalletsStore = create<PalletsStore>((set, get) => ({
  pallets: [],
  setPallets: (pallets: Pallet[]) => set({ pallets }),
  getPallets: () => get().pallets,
}));
