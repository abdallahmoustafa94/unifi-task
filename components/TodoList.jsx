import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Box,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const TodoList = () => {
  const {
    todos,
    darkMode,
    toggleDarkMode,
    weather,
    loadingWeather,
    addTodo,
    deleteTodo,
    editTodo,
    archiveTodo,
  } = useTodoContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#ff4081',
      },
      background: {
        default: darkMode ? '#333' : '#fafafa',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{py:4}}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h1" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <IconButton onClick={toggleDarkMode} color="primary">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        </Box>

        {loadingWeather ? (
          <p>Loading weather...</p>
        ) : (
          weather && (
            <div>
              <Typography variant="h2">Current Weather</Typography>
              <p>{weather.current.weather[0].description}</p>
              <p>Temperature: {weather.current.temp} °C</p>
              <p>Humidity: {weather.current.humidity}%</p>
            </div>
          )
        )}

        <TodoForm addTodo={addTodo} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            archiveTodo={archiveTodo}
          />
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default TodoList;
