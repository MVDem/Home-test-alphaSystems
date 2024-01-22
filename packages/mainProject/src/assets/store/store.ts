import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import todosReducer from './todosSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});
