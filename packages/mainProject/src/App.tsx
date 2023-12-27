import { useEffect, useState } from 'react';
import { IStateUser, ITodo } from './assets/types/types';
import { getTodos } from './assets/https/requests.ts';
import TodoCreate from './components/TodoCreate.tsx';
import TodoList from './components/TodoList.tsx';
import styles from './app.module.scss';
import Login from './components/Login.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from './assets/store/userSlice.ts';

function App() {
  const [todos, setTodos] = useState<ITodo[] | []>([]);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dispach = useDispatch();

  const user = useSelector((state: IStateUser) => state.user);

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  const handleLogout = () => {
    dispach(removeUser());
    setIsLogoutVisible(false);
  };

  return (
    <div className={styles.todo}>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          {user.name ? (
            <div>
              <button
                className={styles.header__btn}
                onClick={() => setIsLogoutVisible(!isLogoutVisible)}
              >
                {user.name}
              </button>
              {isLogoutVisible && (
                <button
                  className={styles.header__logout}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <button
              className={styles.header__btn}
              onClick={() => setIsVisible(!isVisible)}
            >
              Login
            </button>
          )}
        </div>
      </header>
      <main className={styles.content}>
        <div className={styles.content__wrapper}>
          {user.name && <TodoCreate setTodos={setTodos} />}
          <TodoList data={todos} setTodos={setTodos} />
          <div
            style={{
              display: isVisible ? 'flex' : 'none',
            }}
          >
            <Login setIsVisible={setIsVisible} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
