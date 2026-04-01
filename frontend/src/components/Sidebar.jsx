import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['admin', 'hr', 'finance'] },
  { path: '/employees', label: 'Employee Directory', icon: '👥', roles: ['admin', 'hr'] },
  { path: '/payroll', label: 'Payroll Management', icon: '💰', roles: ['admin', 'finance'] },
  { path: '/talent', label: 'Talent Management', icon: '🎯', roles: ['admin', 'hr'] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const visibleItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🏢</span>
        <h2>PeopleFlow</h2>
      </div>
      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <span className="user-avatar">🔑</span>
          <div>
            <p className="user-name">{user.username}</p>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
}
