import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';
import Login from '../Components/Login';

function IsUser() {
  const { isAuthenticated, isLoading } = useAuth0();
  // console.log({ isAuthenticated, isLoading });
  if (!isLoading && isAuthenticated) return <Outlet />;
  return <Login />;
}

export default IsUser;
