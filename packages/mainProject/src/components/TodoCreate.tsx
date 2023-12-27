import { useState } from 'react';
import { IStateUser, ITodo } from '../assets/types/types';
import { createTodos } from '../assets/https/requests.ts';
import styles from './scss/todoCreate.module.scss';
import { useSelector } from 'react-redux';

export default function TodoCreate(props: { setTodos: any }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector((state: IStateUser) => state.user);

  const handleAddTodo = () => {
    if (title.trim().length && description.trim().length) {
      const todo: ITodo = {
        id: Date.now(),
        author: user.name,
        title: title,
        description: description,
        complited: false,
      };
      createTodos(todo, props.setTodos);
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
