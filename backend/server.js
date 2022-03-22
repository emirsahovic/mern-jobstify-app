import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
