import { create } from 'zustand';

interface MenuItem {
  name: string;
  price: number;
}

interface MenuState {
  picks: MenuItem[];
  addPick: (item: MenuItem) => void;
  removePick: (index: number) => void;
  total: number;
}

export const useStore = create<MenuState>((set) => ({
  picks: [],
  total: 0,
  addPick: (item) => set((state) => ({ 
    picks: [...state.picks, item],
    total: state.total + item.price 
  })),
  removePick: (index) => set((state) => {
    const newPicks = state.picks.filter((_, i) => i !== index);
    const newTotal = newPicks.reduce((acc, curr) => acc + curr.price, 0);
    return { picks: newPicks, total: newTotal };
  }),
}));