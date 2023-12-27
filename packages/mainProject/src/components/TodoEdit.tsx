import { useState } from 'react';
import { IStateUser, ITodo } from '../assets/types/types';
import styles from './scss/todoEdit.module.scss';
import { useSelector } from 'react-redux';
import { editTodo } from '../assets/https/requests.ts';

export default function TodoEdit(props: {
  editbleTodo: ITodo;
  setTodos: any;
  setEditebleTodo: any;
}) {
  const [title, setTitle] = useState(props.editbleTodo.title);
  const [description, setDescription] = useState(props.editbleTodo.description);

  const user = useSelector((state: IStateUser) => state.user);

  const handleEditTodo = () => {
    if (title.trim().length && description.trim().length) {
      const todo: ITodo = {
        id: props.editbleTodo.id,
        author: props.editbleTodo.author,
        title: title,
        description: description,
        complited: false,
        editUser: user.name,
        editDate: Date.now(),
      };
      editTodo(todo, props.setTodos);
      setTitle('');
      setDescription('');
      props.setEditebleTodo(undefined);
    }
  };

  return (
    <div className={styles.edit}>
      <input
        placeholder="Напишите назввание"
        className={styles.edit__form}
        required={true}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Укажите описание"
        className={styles.edit__form}
        required={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles.edit__btn} onClick={handleEditTodo}>
        Изменить задачу
      </button>
    </div>
  );
}
