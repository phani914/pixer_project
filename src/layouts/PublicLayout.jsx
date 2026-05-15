import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import RouteSEO from '../components/RouteSEO.jsx';

function PublicLayout() {
  return (
    <div className="app-shell">
      <RouteSEO />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
