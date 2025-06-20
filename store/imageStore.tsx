import { create } from "zustand";

export interface Images {
  id: string;
  url: string;
  path: string;
}
interface ImageState {
  image: Images[];
  setImage: (image: Images[]) => void;
}

const useImageStore = create<ImageState>((set) => ({
  image: [],
  setImage: (value: Images[]) => set({ image: value }),
}));

export default useImageStore;
