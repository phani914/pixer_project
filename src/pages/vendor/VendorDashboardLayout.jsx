import { NavLink, Outlet } from 'react-router-dom';
import {
  FiBarChart2,
  FiBox,
  FiCreditCard,
  FiGrid,
  FiPackage,
  FiSettings,
  FiShoppingBag,
  FiUser,
} from 'react-icons/fi';
import routePaths from '../../routes/routePaths.js';

const vendorNavItems = [
  { icon: FiGrid, label: 'Overview', to: routePaths.vendorDashboard },
  { icon: FiBox, label: 'Products', to: routePaths.vendorProducts },
  { icon: FiShoppingBag, label: 'Orders', to: routePaths.vendorOrders },
  { icon: FiCreditCard, label: 'Earnings', to: routePaths.vendorEarnings },
];

function VendorDashboardLayout() {
  return (
    <section className="dashboard-section vendor-dashboard-section">
      <div className="container">
        <div className="dashboard-shell">
          <aside className="dashboard-sidebar" aria-label="Vendor dashboard">
            <div className="dashboard-profile">
              <div className="dashboard-avatar vendor-avatar">
                <FiPackage aria-hidden="true" />
              </div>
              <div>
                <strong>Northstar Studio</strong>
                <span>Vendor workspace</span>
              </div>
            </div>

            <nav className="dashboard-menu">
              {vendorNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    className={({ isActive }) =>
                      `dashboard-menu-item ${isActive ? 'active' : ''}`
                    }
                    end={item.to === routePaths.vendorDashboard}
                    key={item.to}
                    to={item.to}
                  >
                    <Icon aria-hidden="true" /> {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="vendor-sidebar-card">
              <FiBarChart2 aria-hidden="true" />
              <strong>Store health</strong>
              <span>92%</span>
            </div>

            <button className="dashboard-menu-item vendor-settings-button" type="button">
              <FiSettings aria-hidden="true" /> Store settings
            </button>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-header">
              <div>
                <span className="section-kicker">Vendor dashboard</span>
                <h1>Manage your marketplace store.</h1>
                <p>
                  Track sales, publish products, review orders, and monitor
                  payouts from one focused vendor workspace.
                </p>
              </div>
              <button className="btn btn-primary d-inline-flex align-items-center gap-2" type="button">
                <FiUser aria-hidden="true" /> View storefront
              </button>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorDashboardLayout;
