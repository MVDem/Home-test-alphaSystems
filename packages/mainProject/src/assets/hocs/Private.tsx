import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { IStateUser } from '../types/types';

const Private = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector((state: IStateUser) => state.user);

  if (!user.name) {
    return <Navigate to="/signIn" state={{ from: location }} />;
  }
  return children;
};

export { Private };
