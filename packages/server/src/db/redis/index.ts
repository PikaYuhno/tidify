import Redis from 'ioredis';
const redisClient = new Redis(
    {
        host: process.env.NODE_ENV === "production" ? "redis_db" : undefined,
        retryStrategy: times => Math.min(times * 200, 2000)
    }
);

export default redisClient;
