import { BASE_URL } from "../constants";

export const getGuilds = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/users/guilds`);
    return response.json();
}

export const createGuild = async (name: string) => {
    const response = await fetch(`${BASE_URL}/api/v1/users/guilds`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })
    });
    return response.json();
}

export const getMembers = async (guildId?: number) => {
    const response = await fetch(`${BASE_URL}/api/v1/guilds/${guildId}/members`);
    return response.json();
}
