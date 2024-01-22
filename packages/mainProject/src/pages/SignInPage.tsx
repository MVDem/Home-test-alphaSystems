import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../assets/types/types';
import { setUser } from '../assets/store/userSlice';
import { signIn } from '../assets/https/requests';
import styles from './styles/Sign.module.scss';

export function SignInPage() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = (user: IUser) => {
    dispatch(
      setUser({
        name: user.name,
        password: user.password,
      })
    );
  };

  const handleLogin = async () => {
    if (login.trim().length && pass.trim().length) {
      const user: IUser = {
        name: login,
        password: pass,
      };
      await signIn(user, authUser);
      setLogin('');
      setPass('');
      navigate('/todos', { replace: true });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h4 className={styles.login__title}>Login</h4>
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
        <button className={styles.login__btn} onClick={handleLogin}>
          Login
        </button>
        <NavLink className={styles.login__link} to={`/signUp`}>
          Or register
        </NavLink>
      </div>
    </div>
  );
}
