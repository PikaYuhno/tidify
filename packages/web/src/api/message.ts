import { BASE_URL } from "../constants";

export const getMessages = async (channelId: number) => {
    if (!channelId) return;
    const response = await fetch(`${BASE_URL}/api/v1/channels/${channelId}/messages`);
    return response.json();
}

export const createMessage = async (data: { channelId: number, content: string }) => {
    const response = await fetch(`${BASE_URL}/api/v1/channels/${data.channelId}/messages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: data.content })
    });
    return response.json();
}