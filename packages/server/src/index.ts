import express, { Request, Response } from 'express';
import { createConnection, sequelize } from './db/connection';
import { Server } from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotnev from 'dotenv';
import session from 'express-session';
import connectRedis from 'connect-redis';
import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroSequelize from '@admin-bro/sequelize';

import { UserSession } from './types';
import redisClient from './db/redis';
import { verifySession } from './utils/verifySession';
import { requireRoles } from './utils/requireRoles';
import {CLIENT_HOST} from './constants';
import wsServer from './api/ws/chat';

// import Routes
import { router as userRouter } from './api/user';
import { router as authRouter } from './api/auth';
import { router as channelRouter } from './api/channel';
import { router as guildRouter } from './api/guild';
import { router as boardRouter } from './api/board';
import { router as columnRouter } from './api/column';

import User from './db/models/User';

declare module "express-session" {
    interface Session {
        user?: UserSession;
    }
}

dotnev.config();
AdminBro.registerAdapter(AdminBroSequelize);
const RedisStore = connectRedis(session);
const adminBro = new AdminBro({
    rootPath: '/admin',
    resources: [User],
});
const adminBroRouter = AdminBroExpress.buildRouter(adminBro);
const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 4000;
const API_PREFIX = "/api/v1";

app.use(cors({ credentials: true, origin: CLIENT_HOST }));
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    store: new RedisStore({ client: redisClient }),
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
app.use(adminBro.options.rootPath, verifySession, requireRoles(['admin']), adminBroRouter);


app.use(`${API_PREFIX}/users`, verifySession, userRouter);
app.use(`${API_PREFIX}/channels`, verifySession, channelRouter);
app.use(`${API_PREFIX}/guilds`, verifySession, guildRouter);
app.use(`${API_PREFIX}/boards`, verifySession, boardRouter);
app.use(`${API_PREFIX}/columns`, verifySession, columnRouter);
app.use(`${API_PREFIX}/auth`, authRouter);

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
console.log("ENV", process.env.NODE_ENV);
const server: Server = app.listen(PORT, () => console.log(`🚀 Started Server on port ${PORT}`));
wsServer(server);
