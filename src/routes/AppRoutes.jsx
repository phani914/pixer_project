import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routePaths from './routePaths.js';

const PublicLayout = lazy(() => import('../layouts/PublicLayout.jsx'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute.jsx'));
const AboutPage = lazy(() => import('../pages/public/AboutPage.jsx'));
const CartPage = lazy(() => import('../pages/public/CartPage.jsx'));
const ContactPage = lazy(() => import('../pages/public/ContactPage.jsx'));
const HomePage = lazy(() => import('../pages/public/HomePage.jsx'));
const LoginPage = lazy(() => import('../pages/public/LoginPage.jsx'));
const ProductDetailsPage = lazy(() => import('../pages/public/ProductDetailsPage.jsx'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage.jsx'));
const ShopPage = lazy(() => import('../pages/public/ShopPage.jsx'));
const UserDashboardPage = lazy(() => import('../pages/public/UserDashboardPage.jsx'));
const VendorDashboardLayout = lazy(() => import('../pages/vendor/VendorDashboardLayout.jsx'));
const VendorEarningsPage = lazy(() => import('../pages/vendor/VendorEarningsPage.jsx'));
const VendorOrdersPage = lazy(() => import('../pages/vendor/VendorOrdersPage.jsx'));
const VendorOverviewPage = lazy(() => import('../pages/vendor/VendorOverviewPage.jsx'));
const VendorProductsPage = lazy(() => import('../pages/vendor/VendorProductsPage.jsx'));

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      Loading page...
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={routePaths.home} element={<HomePage />} />
          <Route path={routePaths.shop} element={<ShopPage />} />
          <Route path={routePaths.productDetails} element={<ProductDetailsPage />} />
          <Route path={routePaths.about} element={<AboutPage />} />
          <Route path={routePaths.contact} element={<ContactPage />} />
          <Route path={routePaths.login} element={<LoginPage />} />
          <Route path={routePaths.register} element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={routePaths.cart} element={<CartPage />} />
            <Route path={routePaths.dashboard} element={<UserDashboardPage />} />
            <Route path={routePaths.vendorDashboard} element={<VendorDashboardLayout />}>
              <Route index element={<VendorOverviewPage />} />
              <Route path="products" element={<VendorProductsPage />} />
              <Route path="orders" element={<VendorOrdersPage />} />
              <Route path="earnings" element={<VendorEarningsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
