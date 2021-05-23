import {v4 as uuid} from 'uuid';
import redisClient from '../db/redis';
import dotenv from 'dotenv';
dotenv.config();

export const genChangePwURL = async (userId: number): Promise<string> => {
    const id = uuid();
    await redisClient.set(id, userId.toString(), "EX", 60 * 60 * 24);
    return `${process.env.FRONTEND_HOST}/auth/reset/password/${id}`;
}
