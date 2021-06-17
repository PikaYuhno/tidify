import { BASE_URL } from "../constants";

export const getGuilds = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/users/guilds`);
    return response.json();
}

export const createGuild = async (name: string) => {
    console.log("Here", name);
    const response = await fetch(`${BASE_URL}/api/v1/users/guilds`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })
    });
    return response.json();
}