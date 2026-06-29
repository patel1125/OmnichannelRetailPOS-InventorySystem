import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="brand-group">
          <Link to="/" className="brand">TiffinBox</Link>
          <span className="location-pill">📍 Set delivery location</span>
        </div>
        <nav>
          <Link to="/">Restaurants</Link>
          {user && <Link to="/orders">Orders</Link>}
          {user && <Link to="/reservations">Reservations</Link>}
          {user && <Link to="/loyalty">Rewards</Link>}
          {user && <Link to="/notifications">🔔</Link>}
          {user && <Link to="/cart">Cart</Link>}
          {user ? (
            <button
              className="btn btn-outline"
              onClick={handleLogout}
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
