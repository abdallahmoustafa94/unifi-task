import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

// eslint-disable-next-line react/prop-types
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "ac05d6e6f64725a1a6c8c377db46e965";
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true }
      );
    });
  };

  const getWeather = async () => {
    try {
      const userLocation = await getUserLocation();
      const { latitude, longitude } = userLocation;

      const currentWeatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      const forecastResponse = await fetch(
        `${BASE_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();

      // eslint-disable-next-line no-undef
      setWeather({
        current: currentWeatherData,
        hourly: forecastData.hourly,
        daily: forecastData.daily,
      });

      // eslint-disable-next-line no-undef
      setLoadingWeather(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // eslint-disable-next-line no-undef
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const addTodo = (newTodo) => {
    const newId = Math.floor(Math.random() * 1000);
    const todoToAdd = {
      id: newId,
      ...newTodo,
      checked: false,
      createdAt: new Date(),
      finishedAt: null,
      archiveAt: null,
    };
    setTodos((prevTodos) => [...prevTodos, todoToAdd]);
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const editTodo = (editedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const archiveTodo = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, archiveAt: new Date() } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, darkMode, toggleDarkMode, addTodo, deleteTodo, editTodo, archiveTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
