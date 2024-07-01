import { create } from "zustand";

export const useContract = create((set) => ({
  contract: {},
  setContract: (contract: any) => set({ contract }),
}));
