import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';
import './Navbar.css';

function Navbar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎓 Club Manager</h2>
      </div>
      <div className="nav-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/members" className={location.pathname === '/members' ? 'active' : ''}>
          Members
        </Link>
        <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>
          Events
        </Link>
      </div>
      <div className="nav-user">
        <span>{user?.user_metadata?.full_name || user?.email}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;