import { create } from 'zustand';

export type Enjoyment = 'low' | 'medium' | 'high';
export type Difficulty = 'easy' | 'good' | 'hard';
export type RepeatIntent = 'no' | 'maybe' | 'yes';

type FeedbackState = {
  enjoyment: Enjoyment | null;
  difficulty: Difficulty | null;
  repeatIntent: RepeatIntent | null;
  setEnjoyment: (enjoyment: Enjoyment) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setRepeatIntent: (repeatIntent: RepeatIntent) => void;
  resetFeedback: () => void;
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  enjoyment: null,
  difficulty: null,
  repeatIntent: null,
  setEnjoyment: (enjoyment) => set({ enjoyment }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setRepeatIntent: (repeatIntent) => set({ repeatIntent }),
  resetFeedback: () =>
    set({ enjoyment: null, difficulty: null, repeatIntent: null }),
}));
