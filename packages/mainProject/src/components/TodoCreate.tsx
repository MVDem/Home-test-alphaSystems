import { useState } from 'react';
import { IState, ITodo } from '../assets/types/types';
import { createTodos } from '../assets/https/requests.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../assets/store/todosSlice.ts';
import styles from './scss/todoCreate.module.scss';

export default function TodoCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector((state: IState) => state.user);

  const dispatch = useDispatch();
  const handleSetTodos = (data: any) => {
    dispatch(setTodos(data));
  };

  const handleAddTodo = () => {
    if (title.trim().length && description.trim().length) {
      const todo: ITodo = {
        id: Date.now(),
        author: user.name,
        title: title,
        description: description,
        complited: false,
      };
      createTodos(todo, handleSetTodos);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={styles.create}>
      <input
        placeholder="Напишите назввание"
        className={styles.create__form}
        required={true}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Укажите описание"
        className={styles.create__form}
        required={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles.create__btn} onClick={handleAddTodo}>
        Добавить задачу
      </button>
    </div>
  );
}
