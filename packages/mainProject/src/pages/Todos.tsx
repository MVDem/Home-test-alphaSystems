import { useEffect } from 'react';
import TodoCreate from '../components/TodoCreate';
import TodoList from '../components/TodoList';
import { useDispatch } from 'react-redux';
import { setTodos } from '../assets/store/todosSlice';
import { getTodos } from '../assets/https/requests';

export function Todos() {
  const dispatch = useDispatch();

  const handleSetTodos = (data: any) => {
    dispatch(setTodos(data));
  };

  useEffect(() => {
    getTodos(handleSetTodos);
  }, []);

  console.log('render todos');

  return (
    <>
      <TodoCreate />
      <TodoList />
    </>
  );
}
