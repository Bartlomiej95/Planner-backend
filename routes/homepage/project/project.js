import express from 'express';
import auth from '../../../middlewares/auth.js';
import { getDepartments } from '../../../controllers/departments.js';
import { createProject, getDetailsProject, editProject } from '../../../controllers/projects.js';
import { createNewTask } from '../../../controllers/tasks.js';

const router = express.Router();

router.get('/create', auth, getDepartments);
router.post('/create', auth, createProject);
router.get('/:name', auth , getDetailsProject);
router.post('/tasks', auth, createNewTask);
router.put('/edit/:name', auth, editProject);
 
export default router;
