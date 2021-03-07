import express, {Request, Response} from 'express';
import {createConnection, sequelize} from './db/connection';
import cors from 'cors';
import morgan from 'morgan';
import dotnev from 'dotenv';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {UserSession} from './types';
import redisClient from './db/redis';

// import Routes
import {router as userRouter} from './api/user';
import {router as authRouter} from './api/auth';

declare module "express-session" {
    interface Session {
        user?: UserSession;
    }
}


dotnev.config();
const RedisStore = connectRedis(session); 
const app = express();

const PORT = process.env.PORT || 4000;
const API_PREFIX = "/api/v1";

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    name: "qid",
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 Days
    }
}));

app.use(`${API_PREFIX}/user`, userRouter);
app.use(`${API_PREFIX}/auth`, authRouter);

app.get("/", (_: Request, res: Response) => {
    return res.send("Hello World");
});

const testConnection = async () => {
    let retries = 5;
    while (retries !== 0) {
        try {
            createConnection()
            break;
        } catch (e) {
            console.error(e);
            retries--;
            await new Promise((res, _) => setTimeout(res, 2000));
        }
    }
}

testConnection().then(async () => {
    await sequelize.sync();
});
app.listen(PORT, () => console.log(`🚀 Started Server on port ${PORT}`));
