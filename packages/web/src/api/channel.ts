import { GuildAttributes } from "@tidify/common";
import { BASE_URL } from "../constants";

export const getChannels = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/users/channels`);
    return response.json();
}

export const createChannel = async (name: string) => {
    const response = await fetch(`${BASE_URL}/api/v1/users/channels`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })
    });
    return response.json();
}