import { NavLink } from 'react-router-dom';
import c from './Navbar.module.css';

const Navbar: React.FC = () => {
  return <nav className={c.nav}>
    <div className={c.item}>
      <NavLink to="/profile" className={({ isActive }) => isActive ? c.activeLink : undefined}>Profile</NavLink>
    </div>
    <div className={c.item}>
      <NavLink to="/dialogs" className={({ isActive }) => isActive ? c.activeLink : undefined}>Messages</NavLink>
    </div>
    <div className={c.item}>
      <NavLink to="/users" className={({ isActive }) => isActive ? c.activeLink : undefined}>Contacts</NavLink>
    </div>
    <div className={c.item}>
      <NavLink to="/news">News</NavLink>
    </div>
    <div className={c.item}>
      <NavLink to="/music">Music</NavLink>
    </div>
    <div className={c.item}>
      <NavLink to="/settings">Settings</NavLink>
    </div>
  </nav>
}

export default Navbar;
