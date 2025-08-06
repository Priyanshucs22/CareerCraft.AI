import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import authRoutes from './routes/authRoutes.js';
import db from './config/db.js';

// Configure dotenv first before using environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmap', roadmapRoutes);

app.listen(PORT , () => {
    db();
    console.log(`server is listening on port : ${PORT}`);
})