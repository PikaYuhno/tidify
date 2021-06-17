import { combine } from 'zustand/middleware'
import create from 'zustand'
import { ChannelAttributes } from '@tidify/common';

export type Selection = 'overview' | 'members' | 'calendar' | 'kanban' | ChannelAttributes;

export const useSelectedChannel = create(
    combine(
        {
            selectedChannel: 'overview' as Selection,
        },
        (set) => ({ select: (selection: Selection) => set((state) => ({ selectedChannel: selection })) })
    ),
)