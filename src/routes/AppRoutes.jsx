import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import AboutPage from '../pages/public/AboutPage.jsx';
import CartPage from '../pages/public/CartPage.jsx';
import ContactPage from '../pages/public/ContactPage.jsx';
import HomePage from '../pages/public/HomePage.jsx';
import LoginPage from '../pages/public/LoginPage.jsx';
import ProductDetailsPage from '../pages/public/ProductDetailsPage.jsx';
import RegisterPage from '../pages/public/RegisterPage.jsx';
import ShopPage from '../pages/public/ShopPage.jsx';
import UserDashboardPage from '../pages/public/UserDashboardPage.jsx';
import VendorDashboardLayout from '../pages/vendor/VendorDashboardLayout.jsx';
import VendorEarningsPage from '../pages/vendor/VendorEarningsPage.jsx';
import VendorOrdersPage from '../pages/vendor/VendorOrdersPage.jsx';
import VendorOverviewPage from '../pages/vendor/VendorOverviewPage.jsx';
import VendorProductsPage from '../pages/vendor/VendorProductsPage.jsx';
import routePaths from './routePaths.js';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.shop} element={<ShopPage />} />
        <Route path={routePaths.productDetails} element={<ProductDetailsPage />} />
        <Route path={routePaths.about} element={<AboutPage />} />
        <Route path={routePaths.contact} element={<ContactPage />} />
        <Route path={routePaths.cart} element={<CartPage />} />
        <Route path={routePaths.dashboard} element={<UserDashboardPage />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route path={routePaths.register} element={<RegisterPage />} />
        <Route path={routePaths.vendorDashboard} element={<VendorDashboardLayout />}>
          <Route index element={<VendorOverviewPage />} />
          <Route path="products" element={<VendorProductsPage />} />
          <Route path="orders" element={<VendorOrdersPage />} />
          <Route path="earnings" element={<VendorEarningsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
