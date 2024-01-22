import { createSlice } from '@reduxjs/toolkit';
import { IinitialStateTodos } from '../types/types';

const initialState: IinitialStateTodos = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state: IinitialStateTodos, action) => {
      state.todos = [];
      state.todos = [...action.payload];
    },
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
