import express, {Request, Response} from 'express';

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World");
});

app.listen(PORT, () => console.log(`🚀 Started Server on port ${PORT}`));


