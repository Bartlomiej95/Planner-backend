import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import registerRouter from './routes/register.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const url = process.env.ATLAS_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(port, () => console.log(`Serwer is running on port ${port}`)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);

app.use('/register', registerRouter);

