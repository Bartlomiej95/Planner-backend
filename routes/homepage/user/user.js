import express from 'express';
import auth from '../../../middlewares/auth.js';
import { createProject, fetchAllData } from '../../../controllers/projects.js';

const router = express.Router();


router.get('/', auth, fetchAllData);
router.post('/project', auth, createProject);

export default router;