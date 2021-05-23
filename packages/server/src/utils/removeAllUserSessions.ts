import { SESSION_USERID_PREFIX, SESSION_PREFIX } from "../constants";
import { Redis } from 'ioredis';

export const removeAllUsersSessions = async (userId: number, redis: Redis) => {
    const sessionIds = await redis.lrange(
        `${SESSION_USERID_PREFIX}${userId}`,
        0,
        -1
    );

    const promises = [];
    for (let i = 0; i < sessionIds.length; i += 1) {
        promises.push(redis.del(`${SESSION_PREFIX}${sessionIds[i]}`));
    }
    await Promise.all(promises);
};
