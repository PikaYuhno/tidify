import { combine } from 'zustand/middleware'
import create from 'zustand'

export type Selection = 'overview' | 'members' | 'calendar' | 'kanban' | 'text' | 'github';

export const useSelectedChannel = create(
    combine(
        {
            selectedChannel: 'overview' as Selection,
        },
        (set) => ({ select: (selection: Selection) => set((state) => ({ selectedChannel: selection })) })
    ),
)