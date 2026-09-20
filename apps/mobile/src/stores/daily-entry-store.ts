import { create } from 'zustand';

export type DailyEntry = {
  id: string;
  content: string;
  createdAt: string;
};

type DailyEntryState = {
  entries: DailyEntry[];
  addEntry: (entry: DailyEntry) => void;
};

export const useDailyEntryStore = create<DailyEntryState>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => ({ entries: [...state.entries, entry] })),
}));
