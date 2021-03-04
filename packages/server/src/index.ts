import express, {Request, Response} from 'express';
import {createConnection, sequelize} from './db/connection';
import cors from 'cors';
import morgan from 'morgan';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(morgan('dev'));

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
