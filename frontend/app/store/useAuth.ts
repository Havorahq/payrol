import { create } from "zustand";

export const useAuth = create((set) => ({
  authUser: {},
  setAuthUser: (authUser: any) => set({ authUser }),
}));
