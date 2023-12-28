import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://vee:<password>@vsza-tech.kk0y3cx.mongodb.net/"
);

app.listen(3000, () => {console.log('Server started')})