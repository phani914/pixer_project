import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppState } from '../state/useAppState.js';
import routePaths from './routePaths.js';

function ProtectedRoute() {
  const { isAuthenticated } = useAppState();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={routePaths.login}
        replace
        state={{
          from: location,
          message: 'Please login to access this protected page.',
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
