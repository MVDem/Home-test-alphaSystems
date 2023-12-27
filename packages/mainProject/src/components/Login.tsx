import { useState } from 'react';
import styles from './scss/login.module.scss';
import { IUser } from '../assets/types/types';
import { register, signIn } from '../assets/https/requests.ts';
import { useDispatch } from 'react-redux';
import { setUser } from '../assets/store/userSlice.ts';

export default function Login(props: { setIsVisible: any }) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const regUser = (user: IUser) => {
    dispatch(
      setUser({
        name: user.name,
        password: user.password,
      })
    );
  };

  const handleRegister = () => {
    if (login.trim().length && pass.trim().length) {
      const user: IUser = {
        name: login,
        password: pass,
      };
      register(user, regUser);
      setLogin('');
      setPass('');
      props.setIsVisible(false);
    }
  };

  const handleLogin = () => {
    if (login.trim().length && pass.trim().length) {
      const user: IUser = {
        name: login,
        password: pass,
      };
      signIn(user, regUser);
      setLogin('');
      setPass('');
      props.setIsVisible(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__wrapper}>
        <h4 className={styles.login__title}>Register / login</h4>
        <input
          placeholder="Name"
          className={styles.login__form}
          required={true}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          placeholder="Password"
          className={styles.login__form}
          required={true}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className={styles.login__btn} onClick={handleRegister}>
          Register
        </button>
        <button className={styles.login__btn} onClick={handleLogin}>
          Or Login
        </button>
      </div>
    </div>
  );
}
