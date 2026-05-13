import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import AboutPage from '../pages/public/AboutPage.jsx';
import CartPage from '../pages/public/CartPage.jsx';
import ContactPage from '../pages/public/ContactPage.jsx';
import HomePage from '../pages/public/HomePage.jsx';
import ShopPage from '../pages/public/ShopPage.jsx';
import routePaths from './routePaths.js';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.shop} element={<ShopPage />} />
        <Route path={routePaths.about} element={<AboutPage />} />
        <Route path={routePaths.contact} element={<ContactPage />} />
        <Route path={routePaths.cart} element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
