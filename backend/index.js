import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import resumeRoutes from './routes/resumeRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

// Configure dotenv first before using environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'], // Vite and React ports
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

// Cookie parser middleware
app.use(cookieParser());

// Increase payload size limits for file uploads and large requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmap', roadmapRoutes);

app.listen(PORT , () => {
    db();
    console.log(`server is listening on port : ${PORT}`);
})