import type { Images } from "@/store/imageStore";
import { create } from "zustand";

interface SelectedState {
  selectedIds: Set<Images>;
  toggle: (id: Images) => void;
  clearSelectedIds: () => void;
}

const useSelectedStore = create<SelectedState>((set) => ({
  selectedIds: new Set(),
  toggle: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      return { selectedIds: next };
    }),
  clearSelectedIds: () => set({ selectedIds: new Set() }),
}));

export default useSelectedStore;
