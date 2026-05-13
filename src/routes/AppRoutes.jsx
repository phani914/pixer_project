import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import HomePage from '../pages/public/HomePage.jsx';
import routePaths from './routePaths.js';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routePaths.home} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
