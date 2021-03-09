import {v4 as uuid} from 'uuid';
import redisClient from '../db/redis';
import dotenv from 'dotenv';
dotenv.config();

export const genChangePwURL = async (userId: number) => {
    const id = uuid();
    await redisClient.set(id, userId.toString(), "EX", 60 * 60 * 24);
    return `${process.env.FRONTEND_DOMAIN}/auth/reset/password/${id}`;
}
