import express from 'express';
import auth from '../../../middlewares/auth.js';
import { createNewMessage, showAllMessages } from '../../../controllers/message.js';

const router = express.Router();

router.get('/', auth, showAllMessages);
router.post('/create', auth, createNewMessage);

export default router;