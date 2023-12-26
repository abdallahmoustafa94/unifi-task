import TodoList from '../components/TodoList';
import CssBaseline from '@mui/material/CssBaseline';
import { TodoProvider } from '../context/TodoContext';


function App() {
  return (
    <>
      <CssBaseline />
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
