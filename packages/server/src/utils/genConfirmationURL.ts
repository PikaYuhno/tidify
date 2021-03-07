import {v4} from 'uuid';
import redisClient from '../db/redis';

export const genConfirmationURL = async (userId: number) => {
    const uuid = v4();
    await redisClient.set(uuid, userId.toString(), "EX", 60 * 60 * 24);
    return `http://localhost:3000/auth/confirm/${uuid}`;
}
