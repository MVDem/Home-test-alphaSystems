import styles from './styles/LayOut.module.scss';
import { IState } from '../assets/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../assets/store/userSlice.ts';
import { NavLink, Outlet } from 'react-router-dom';

export function LayOut() {
  const dispach = useDispatch();
  const user = useSelector((state: IState) => state.user);

  const handleLogout = () => {
    dispach(removeUser());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          {user.name ? (
            <div className={styles.header__rightPanel}>
              <div className={styles.header__name}>{user.name}</div>
              <button className={styles.header__logout} onClick={handleLogout}>
                <img src="./img/logout.svg" alt="logout" />
              </button>
            </div>
          ) : (
            <NavLink to={`/signIn`}>
              <button className={styles.header__link}>Login</button>
            </NavLink>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
}
