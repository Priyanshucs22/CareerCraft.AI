const upload = multer();
import multer from 'multer';
import express from 'express';
const router = express.Router();
import { uploadResume } from '../controllers/resumeController.js';

// 👇 This line is crucial: 'resume' must match the form field name
router.post('/upload', upload.single('resume'), uploadResume);

export default router;
