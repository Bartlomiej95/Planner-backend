import express from 'express';
import auth from '../../../middlewares/auth.js';
import { createProject, fetchAllTasksAndProjectsForLoggedInUser } from '../../../controllers/projects.js';

const router = express.Router();


router.get('/', auth, fetchAllTasksAndProjectsForLoggedInUser);
router.post('/project', auth, createProject);

export default router;