import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users';
import startupsRoutes from './routes/startups';
import mentorRoutes from './routes/mentor';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/users', usersRoutes);
app.use('/startups', startupsRoutes);
app.use('/mentor', mentorRoutes);

export default app;
