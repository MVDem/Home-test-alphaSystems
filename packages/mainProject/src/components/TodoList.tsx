import { useSelector } from 'react-redux';
import { deleteTodo, editTodo } from '../assets/https/requests.ts';
import { IStateUser, ITodo } from '../assets/types/types';
import styles from './scss/todoList.module.scss';
import TodoEdit from './TodoEdit.tsx';
import { useState } from 'react';

export default function TodoList(props: { data: ITodo[]; setTodos: any }) {
  const [editbleTodo, setEditebleTodo] = useState<ITodo | undefined>(undefined);

  const user = useSelector((state: IStateUser) => state.user);

  const getDate = (e: number) => {
    const date = new Date(e);
    const addLeadingZero = (e: number) => {
      return e < 10 ? '0' + e : e;
    };
    const days = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth());
    const years = addLeadingZero(date.getFullYear());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());

    const timeString = `${days}.${month}.${years} - ${hours}:${minutes}`;

    return timeString;
  };

  const handleDeleteTodo = (id: number) => {
    const todo = props.data.find((e) => e.id === id);
    if (todo) {
      deleteTodo(id, props.setTodos);
    }
  };

  const handleEditTodo = (e: ITodo) => {
    setEditebleTodo(e);
  };

  const handleChekedTodo = (e: ITodo) => {
    const todo: ITodo = { ...e, complited: !e.complited };
    editTodo(todo, props.setTodos);
  };

  return (
    <>
      <div className={styles.todoList}>
        <div className={styles.table}>
          <div className={styles.table__title}>
            <div></div>
            <p>Дата создания</p>
            <p>Автор</p>
            <p>Задача</p>
            <p>Описание</p>
            <p>Состояние</p>
            <p>Изменения</p>
          </div>
          <div className={styles.table__scroll}>
            {props.data.length ? (
              props.data?.map((e, i) => {
                return (
                  <div key={i} className={styles.tableContent}>
                    {user.name ? (
                      <button
                        className={styles.tableContent__button}
                        onClick={() => handleChekedTodo(e)}
                      >
                        <img
                          src="./img/checkbox.svg"
                          alt="checkbox"
                          className={styles.tableContent__checkbox}
                        />
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <p className={styles.tableContent__item}>{getDate(e.id)}</p>
                    <p className={styles.tableContent__item}>{e.author}</p>
                    <p className={styles.tableContent__item}>{e.title}</p>
                    <p className={styles.tableContent__item}>{e.description}</p>
                    <p className={styles.tableContent__item}>
                      {!e.complited ? 'Активно' : 'Выполнено'}
                    </p>
                    {e.editDate ? (
                      <div>
                        <p className={styles.tableContent__item}>
                          {e.editUser}
                        </p>
                        <p className={styles.tableContent__item}>
                          {getDate(e.editDate)}
                        </p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                    <div>
                      {user.name && (
                        <>
                          <button
                            className={styles.tableContent__button}
                            onClick={() => handleEditTodo(e)}
                          >
                            <img src="./img/edit.png" alt="edit" />
                          </button>
                          <button
                            className={styles.tableContent__button}
                            onClick={() => handleDeleteTodo(e.id)}
                          >
                            <img src="./img/trash.png" alt="trash" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.tableContent__notodos}>
                <p>Задач нет</p>
              </div>
            )}
          </div>
        </div>
        {editbleTodo && (
          <div className={styles.edit}>
            <TodoEdit
              editbleTodo={editbleTodo}
              setTodos={props.setTodos}
              setEditebleTodo={setEditebleTodo}
            />
          </div>
        )}
      </div>
    </>
  );
}
