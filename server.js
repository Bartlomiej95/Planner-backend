import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import homepageRouter from './routes/homepage/homepage.js';
import userRouter from './routes/homepage/user/user.js';


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000", "https://planer-app.netlify.app"],
    credentials: true,
}));
app.use(cookieParser());

const url = process.env.ATLAS_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(port, () => console.log(`Serwer is running on port ${port}`)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);

app.use('/homepage', homepageRouter);
app.use('/homepage/user', userRouter);



