import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/user';
import { productRouter } from './routes/product';

require('dotenv').config(); // Load environment variables from .env file

const dbPassword = process.env.DB_PASSWORD; // Retrieve database password from environment variables
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS (Cross-Origin Resource Sharing)

app.use('/user', userRouter); // Register the user routes with the application
app.use('/product', productRouter);

// Connect to MongoDB using the connection string
mongoose.connect(`mongodb+srv://vee:${dbPassword}@vsza-tech.kk0y3cx.mongodb.net/vsza-tech`)
  .then(() => console.log('Connected to MongoDB')) 
  .catch(err => console.error('Error connecting to MongoDB:', err)); 

// Start the server on port 3001
app.listen(3001, () => {
    console.log('Server started on http://localhost:3001') // Log a message when the server starts successfully
})
