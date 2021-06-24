import { TaskAttributes } from "@tidify/common";
import { BASE_URL } from "../constants";

export const createTask = async (data: Omit<TaskAttributes, "id">) => {
    const response = await fetch(`${BASE_URL}/api/v1/columns/${data.colId}/tasks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data })
    });
    return response.json();
}