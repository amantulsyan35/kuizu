import Link from 'next/link';
import { FaSearch, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import supabase from '../../lib/supabase';
import styles from './Navbar.module.css';

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
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <li>
      {icon === 'signin' && (
        <Link href={to}>
          <a>
            <FaUserPlus className='nav-icon' />
          </a>
        </Link>
      )}
      {icon === 'signout' && (
        <FaSignOutAlt className='nav-icon' onClick={handleSignout} />
      )}
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
          <NavList icon='signin' to='/auth/login' />
          <NavList icon='signout' to='#' />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
