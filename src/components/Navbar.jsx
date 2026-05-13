import { NavLink } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import routePaths from '../routes/routePaths.js';

const navItems = [
  { label: 'Home', to: routePaths.home },
  { label: 'Shop', to: routePaths.shop },
  { label: 'About', to: routePaths.about },
  { label: 'Contact', to: routePaths.contact },
];

function Navbar() {
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
          <NavLink to={routePaths.cart} className="btn btn-outline-primary">
            <FiShoppingBag /> Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
