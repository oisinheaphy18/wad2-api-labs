import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasksData);
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const task = tasksData.tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ status: 404, message: 'Task not found' });
  }

  return res.status(200).json(task);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, description, deadline, priority, done } = req.body;

  const timestamp = new Date().toISOString();

  const newTask = {
    id: uuidv4(),
    title,
    description,
    deadline,
    priority,
    done,
    created_at: timestamp,
    updated_at: timestamp
  };

  tasksData.tasks.push(newTask);
  tasksData.total_results++;

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasksData.tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ status: 404, message: 'Task not found' });
  }

  const updatedTask = {
    ...tasksData.tasks[taskIndex],
    ...req.body,
    id: id,
    updated_at: new Date().toISOString()
  };

  tasksData.tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasksData.tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ status: 404, message: 'Task not found' });
  }

  tasksData.tasks.splice(taskIndex, 1);
  tasksData.total_results--;
  res.status(204).send();
});

export default router;
