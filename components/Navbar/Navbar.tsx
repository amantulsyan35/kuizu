import Link from 'next/link';
import styles from './Navbar.module.css';

import {
  FaSearch,
  FaVideo,
  FaBell,
  FaSignOutAlt,
  FaUserPlus,
} from 'react-icons/fa';

interface INavLinkProps {
  icon: string;
  to: string;
}

const NavSearch = () => {
  return (
    <div className='nav-search'>
      <FaSearch />
      <input type='search' placeholder='search' />
    </div>
  );
};

const NavList = ({ icon, to }: INavLinkProps) => {
  return (
    <li>
      {icon === 'notification' && (
        <Link href={to}>
          <a>
            {' '}
            <FaBell className='nav-icon' />
          </a>
        </Link>
      )}
      {icon === 'video' && (
        <Link href={to}>
          <a>
            {' '}
            <FaVideo className='nav-icon' />
          </a>
        </Link>
      )}
      {icon === 'signin' && (
        <Link href={to}>
          <a>
            <FaUserPlus className='nav-icon' />
          </a>
        </Link>
      )}
      {icon === 'signout' && <FaSignOutAlt className='nav-icon' />}
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className='nav-container'>
      <div className='nav-logo'>
        <Link href='/'>
          <a>[ &#128214;, &#9961;]</a>
        </Link>
      </div>

      <NavSearch />
      <div className='nav-links-container'>
        <ul className='nav-links'>
          <NavList icon='notification' to='#' />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
