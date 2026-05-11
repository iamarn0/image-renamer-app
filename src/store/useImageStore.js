import { create } from 'zustand';

export const useImageStore = create((set, get) => ({
  images: [],
  currentIndex: 0,
  history: [],

  setImages: (images) => set({ images }),

  nextImage: () => {
    const { currentIndex, images } = get();

    if (currentIndex < images.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevImage: () => {
    const { currentIndex } = get();

    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  updateImage: (index, updated) => {
    const images = [...get().images];

    images[index] = {
      ...images[index],
      ...updated
    };

    set({ images });
  },

  addHistory: (entry) => {
    set({
      history: [...get().history, entry]
    });
  }
}));