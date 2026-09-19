import { create } from 'zustand';

export type Mission = {
  id: string;
  title: string;
  estimatedMinutes: number;
  status: 'active';
};

type MissionState = {
  activeMission: Mission | null;
  setActiveMission: (mission: Mission) => void;
  clearActiveMission: () => void;
};

export const useMissionStore = create<MissionState>((set) => ({
  activeMission: null,
  setActiveMission: (mission) => set({ activeMission: mission }),
  clearActiveMission: () => set({ activeMission: null }),
}));
