import express from 'express';
import auth from '../../../middlewares/auth.js';
import { getDepartments } from '../../../controllers/departments.js';
import { createProject } from '../../../controllers/projects.js';

const router = express.Router();

router.get('/create', auth, getDepartments);
router.post('/create', auth, createProject )
 
export default router;
