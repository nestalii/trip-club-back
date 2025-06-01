import express from 'express'
import cors from 'cors';
import tripRouter from './routers/tripRouter.js';
import { client } from '../database/Db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRouter from './routers/authRouter.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import userRouter from './routers/userRouter.js';
import * as path from 'node:path';
import fileRouter from "./routers/fileRouter.js";

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve('../public/uploads')));

app.use('/files', authMiddleware, fileRouter);
app.use('/auth', authRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/trips', authMiddleware, tripRouter);

app.use(errorMiddleware);

client.connect()
    .then(() => console.log('Connected to the database'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
