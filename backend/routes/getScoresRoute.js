import { Router } from 'express';
import { getScoresFromAPI } from '../tasks/getScores.js';

const router = Router();

// Define routes
router.get('/', getScoresFromAPI);

export default router;
