import express from 'express';
import auth from '../../../middlewares/auth.js';
import { createProject, fetchAllData } from '../../../controllers/projects.js';
import { changeRate } from '../../../controllers/rates.js';
import { updateTask } from '../../../controllers/tasks.js';

const router = express.Router();


router.get('/', auth, fetchAllData);
router.post('/project', auth, createProject);
// router.put('/', auth, changeRate);

router.put('/',[ auth,  (req, res, next) => {
    const { isFinish, time, value } = req.body;
    if(!value) {
        next('route');
    }
    changeRate(req, res);
}] )

router.put('/', updateTask);

export default router;