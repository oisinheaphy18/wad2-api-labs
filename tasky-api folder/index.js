import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';

dotenv.config();

const app = express();

const port = process.env.PORT;

// use the tasks router for /api/tasks
app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
