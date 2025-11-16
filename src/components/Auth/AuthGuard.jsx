import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default AuthGuard;