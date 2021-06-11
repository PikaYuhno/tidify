import { combine } from 'zustand/middleware'
import create from 'zustand'
import { GuildAttributes } from '@tidify/common'

export const useSelectedGuild = create(
    combine(
        {
            selectedGuild: null as (GuildAttributes | null),
        },
        (set) => ({ select: (selection: GuildAttributes) => set((state) => ({ selectedGuild: selection })) })
    ),
)