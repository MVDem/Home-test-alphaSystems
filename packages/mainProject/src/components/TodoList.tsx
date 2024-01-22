import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editTodo } from '../assets/https/requests.ts';
import { IState, ITodo } from '../assets/types/types';
import { getDate } from '../assets/lib/library.ts';
import styles from './scss/todoList.module.scss';
import { setTodos } from '../assets/store/todosSlice.ts';
import TodoEdit from './TodoEdit.tsx';
import { useState } from 'react';

export default function TodoList() {
  const { todos } = useSelector((state: IState) => state.todos);
  const [editbleTodo, setEditbleTodo] = useState<ITodo>();

  const dispatch = useDispatch();

  const handleSetTodos = (data: any) => {
    dispatch(setTodos(data));
    console.log('handleSetTodos');
  };

  const handleDeleteTodo = (id: number) => {
    const todo = todos.find((e) => e.id === id);
    if (todo) {
      deleteTodo(id, handleSetTodos);
    }
    console.log('handleDeleteTodo');
  };

  const handleEditTodo = (e: ITodo) => {
    setEditbleTodo(e);
    console.log('handleEditTodo');
  };

  const handleChekedTodo = (e: ITodo) => {
    const todo: ITodo = { ...e, complited: !e.complited };
    editTodo(todo, handleSetTodos);
    console.log('handleChekedTodo');
  };

  return (
    <>
      <div className={styles.todoList}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table__title}>
              <th></th>
              <th>Дата создания</th>
              <th>Автор</th>
              <th>Задача</th>
              <th>Описание</th>
              <th>Состояние</th>
              <th>Изменения</th>
            </tr>
          </thead>
          <tbody>
            {todos.length ? (
              todos.map((e, i) => {
                return (
                  <tr key={i} className={styles.table__content}>
                    <td className={styles.table__first}>
                      <button
                        className={styles.table__checkbox}
                        onClick={() => handleChekedTodo(e)}
                      >
                        <img src="./img/checkbox.svg" alt="checkbox" />
                      </button>
                    </td>
                    <td>{getDate(e.id)}</td>
                    <td>{e.author}</td>
                    <td>{e.title}</td>
                    <td>{e.description}</td>
                    <td>{!e.complited ? 'Активно' : 'Выполнено'}</td>
                    <td>
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
                        <p> - - - </p>
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.table__btn}
                        onClick={() => handleEditTodo(e)}
                      >
                        <img src="./img/edit.png" alt="edit" />
                      </button>
                      <button
                        className={styles.table__btn}
                        onClick={() => handleDeleteTodo(e.id)}
                      >
                        <img src="./img/close.svg" alt="trash" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={styles.tableContent__notodos}>
                <td>Задач нет</td>
              </tr>
            )}
          </tbody>
        </table>
        {editbleTodo && (
          <TodoEdit editbleTodo={editbleTodo} setEditbleTodo={setEditbleTodo} />
        )}
      </div>
    </>
  );
}
