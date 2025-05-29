import express from 'express'
import authRouter from './routers/tripRouter.js';

const app = express()
const port = 3000

app.use(express.json());

app.use('/trips', authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
