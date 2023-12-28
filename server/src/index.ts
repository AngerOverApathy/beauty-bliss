import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://vee:${dbPassword}@vsza-tech.kk0y3cx.mongodb.net/`
);

app.listen(3000, () => {console.log('Server started')})