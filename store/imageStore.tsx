import { create } from "zustand";

interface imageState {
  image: string[];
  setImage: (image: string[]) => void;
}

const useImageStore = create<imageState>((set) => ({
  image: [],
  setImage: (value: string[]) => set({ image: value }),
}));

export default useImageStore;
