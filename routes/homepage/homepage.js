import express from 'express';
import auth from '../../middlewares/auth.js';
import { registerUser, loginUsers, logoutUsers, fetchAllUsers } from '../../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUsers);
router.get('/login', fetchAllUsers)
router.get('/logout', logoutUsers );


export default router;