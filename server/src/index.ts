import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/user';
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

mongoose.connect(
    `mongodb+srv://vee:${dbPassword}@vsza-tech.kk0y3cx.mongodb.net/vsza-tech`
);

app.listen(3000, () => {console.log('Server started')})