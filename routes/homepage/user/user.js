import express from 'express';
import auth from '../../../middlewares/auth.js';
import { createProject, getProjectsForLoggedInUser } from '../../../controllers/projects.js';

const router = express.Router();


router.get('/', auth, getProjectsForLoggedInUser);
router.post('/project', auth, createProject)

export default router;