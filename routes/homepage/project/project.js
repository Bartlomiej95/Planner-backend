import express from 'express';
import auth from '../../../middlewares/auth.js';
import { getDepartments } from '../../../controllers/departments.js';

const router = express.Router();

router.get('/create', auth, getDepartments)
 
export default router;
