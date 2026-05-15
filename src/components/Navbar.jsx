import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogIn, FiSearch, FiShoppingBag, FiUserPlus } from 'react-icons/fi';
import routePaths from '../routes/routePaths.js';
import { useAppState } from '../state/useAppState.js';

const navItems = [
  { label: 'Home', to: routePaths.home },
  { label: 'Shop', to: routePaths.shop },
  { label: 'About', to: routePaths.about },
  { label: 'Contact', to: routePaths.contact },
  { label: 'Dashboard', to: routePaths.dashboard },
  { label: 'Vendor', to: routePaths.vendorDashboard },
];

function Navbar() {
  const [productSearch, setProductSearch] = useState('');
  const { cartCount } = useAppState();
  const navigate = useNavigate();

  const handleProductSearch = (event) => {
    event.preventDefault();

    const searchValue = productSearch.trim();
    const nextPath = searchValue
      ? `${routePaths.shop}?search=${encodeURIComponent(searchValue)}`
      : routePaths.shop;

    navigate(nextPath);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to={routePaths.home}>
          <span className="brand-mark" aria-hidden="true">
            <FiShoppingBag />
          </span>
          <span>Pixer</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold text-primary' : ''}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <form className="navbar-search" onSubmit={handleProductSearch} role="search">
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products"
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              aria-label="Search products"
            />
          </form>
          <div className="nav-actions">
            <NavLink
              to={routePaths.login}
              className="btn btn-link auth-nav-link d-inline-flex align-items-center gap-2"
            >
              <FiLogIn aria-hidden="true" /> Login
            </NavLink>
            <NavLink
              to={routePaths.register}
              className="btn btn-primary d-inline-flex align-items-center gap-2"
            >
              <FiUserPlus aria-hidden="true" /> Register
            </NavLink>
            <NavLink
              to={routePaths.cart}
              className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
            >
              <FiShoppingBag aria-hidden="true" /> Cart
              {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
