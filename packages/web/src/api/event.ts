import { EventAttributes } from "@tidify/common";
import { BASE_URL } from "../constants";

export const getEvents = async (guildId?: number) => {
    if (!guildId) return;
    const response = await fetch(`${BASE_URL}/api/v1/guilds/${guildId}/events`);
    return response.json();
}

export const createEvent = async (data: Omit<EventAttributes, "id">) => {
    const response = await fetch(`${BASE_URL}/api/v1/guilds/${data.guildId}/events`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data })
    });
    return response.json();
}