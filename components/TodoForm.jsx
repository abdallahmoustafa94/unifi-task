import  { useState } from 'react';
import { TextField, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const TodoForm = ({ addTodo, editTodo, initialTodo }) => {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(initialTodo ? initialTodo.title : '');
  const [description, setDescription] = useState(
    // eslint-disable-next-line react/prop-types
    initialTodo ? initialTodo.description : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialTodo) {
      editTodo({
        ...initialTodo,
        title,
        description,
      });
    } else {
      addTodo({
        title,
        description,
        checked: false,
        createdAt: new Date(),
        finishedAt: null,
        archiveAt: null,
      });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        required
        sx={{mt : 2}}
      />
      <Button type="submit" variant="contained" color="primary" sx={{mt:2}}>
        {initialTodo ? 'Edit Todo' : 'Add Todo'}
      </Button>
    </form>
  );
};

export default TodoForm;
