import React, { useEffect, useState } from 'react';
import { Container, TextField, IconButton, List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data));
  }, [BACKEND_URL]);

  const addTask = () => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newTask })
    })
    .then(response => response.json())
    .then(task => {
      setTasks([...tasks, task]);
      setNewTask('');
    });
  };

  const deleteTask = (id) => {
    fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  const updateTask = () => {
    fetch(`${BACKEND_URL}/tasks/${editTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: editDescription })
    })
    .then(response => response.json())
    .then(updatedTask => {
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setEditTask(null);
      setEditDescription('');
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom color="primary">
        To-Do List
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ mr: 2 }}
        />
        <IconButton color="primary" onClick={addTask}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {tasks.map(task => (
          <Paper key={task.id} sx={{ mb: 2, p: 2 }}>
            <ListItem>
              {editTask && editTask.id === task.id ? (
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ mr: 2 }}
                />
              ) : (
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {task.description}
                    </Typography>
                  }
                  secondary={`Added: ${formatDate(task.createdAt)} | Updated: ${formatDate(task.updatedAt)}`}
                />
              )}
              <IconButton edge="end" color="secondary" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
              {editTask && editTask.id === task.id ? (
                <IconButton edge="end" color="primary" onClick={updateTask}>
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton edge="end" color="primary" onClick={() => {
                  setEditTask(task);
                  setEditDescription(task.description);
                }}>
                  <EditIcon />
                </IconButton>
              )}
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default App;
