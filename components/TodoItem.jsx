/* eslint-disable react/prop-types */
import  { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import TodoForm from './TodoForm';
import { useTheme } from '@mui/material';

// eslint-disable-next-line react/prop-types
const TodoItem = ({ todo, deleteTodo, editTodo, archiveTodo }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const theme = useTheme();

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEdit = (editedTodo) => {
    editTodo(editedTodo);
    handleEditClose();
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography color="text.secondary">{todo.description}</Typography>
        <Typography>Status: {todo.checked ? 'Checked' : 'Unchecked'}</Typography>
        <Typography>Created At: {todo.createdAt.toString()}</Typography>
        {todo.finishedAt && (
          <Typography>Finished At: {todo.finishedAt.toString()}</Typography>
        )}
        {todo.archiveAt && (
          <Typography>Archived At: {todo.archiveAt.toString()}</Typography>
        )}
        <Button onClick={handleViewOpen} sx={{ color: theme.palette.mode === "dark" ? '#fff' : theme.palette.primary.main }}>View Details</Button>
        <Button onClick={handleEditOpen} sx={{ color: theme.palette.mode === "dark" ? '#fff' : theme.palette.primary.main }}>Edit</Button>
        <Button onClick={() => deleteTodo(todo.id)} sx={{ color: theme.palette.mode === "dark" ? '#fff' : theme.palette.primary.main }}>Delete</Button>
        {!todo.archiveAt && (
          <Button onClick={() => archiveTodo(todo.id)} sx={{ color: theme.palette.mode === "dark" ? '#fff' : theme.palette.primary.main }}>Archive</Button>
        )}
      </CardContent>
      <Dialog open={viewOpen} onClose={handleViewClose}>
        <DialogTitle>Todo Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{todo.title}</Typography>
          <Typography>{todo.description}</Typography>
          <Typography>Status: {todo.checked ? 'Checked' : 'Unchecked'}</Typography>
          <Typography>Created At: {todo.createdAt.toString()}</Typography>
          {todo.finishedAt && (
            <Typography>Finished At: {todo.finishedAt.toString()}</Typography>
          )}
          {todo.archiveAt && (
            <Typography>Archived At: {todo.archiveAt.toString()}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TodoForm editTodo={handleEdit} initialTodo={todo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TodoItem;
