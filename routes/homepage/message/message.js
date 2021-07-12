import express from 'express';
import { createNewMessage, showAllMessages } from '../../../controllers/message.js';
import auth from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, showAllMessages);
router.post('/create', auth, createNewMessage);

export default router;