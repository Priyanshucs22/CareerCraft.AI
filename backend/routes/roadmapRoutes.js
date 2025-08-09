import express from 'express';
import {
  generateRoadmap,
  getUserRoadmaps,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap
} from '../controllers/roadmapController.js';

const router = express.Router();

// Generate new roadmap
router.post('/generate', generateRoadmap);

// Get user's roadmaps
router.get('/user/:userId', getUserRoadmaps);

// Get specific roadmap
router.get('/:roadmapId', getRoadmap);

// Update roadmap
router.put('/:roadmapId', updateRoadmap);

// Delete roadmap
router.delete('/:roadmapId', deleteRoadmap);

export default router;
