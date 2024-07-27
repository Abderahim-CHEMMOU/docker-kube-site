const express = require('express');
const cors = require('cors');
const { Task } = require('./db');
const winston = require('winston');
const path = require('path');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configuration de winston
const logDirectory = '/var/log/backend';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),
  ],
});


  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const corsOptions = {
  origin: FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { description } = req.body;
    const newTask = await Task.create({ description });
    res.json(newTask);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
      task.description = description;
      await task.save();
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
