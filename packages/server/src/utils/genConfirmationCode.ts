import redisClient from '../db/redis';

export const genConfirmationCode = async (userId: number): Promise<string> => {
    const code = generateCode();
    await redisClient.set(code, userId.toString(), "EX", 60 * 60 * 24);
    return code;
}

const generateCode = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += Math.floor(10 * Math.random())
    }
    return code;
}
