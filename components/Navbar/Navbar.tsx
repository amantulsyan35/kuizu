import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaSearch,
  FaSignOutAlt,
  FaUserPlus,
  FaUserNinja,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import supabase from '../../lib/supabase';
import { toast } from 'react-toastify';

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
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push('/auth/login');
    toast.success('successfully logged out');

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
      {icon === 'user' && (
        <Link href={to}>
          <a>
            <FaUserNinja className='nav-icon' />
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
  const [userId, setUserId] = useState<any>('');
  // const user = supabase.auth.user();

  useEffect(() => {
    function getUser() {
      const user = supabase.auth.user();
      if (user === null) {
        setUserId('not_auth');
      } else {
        setUserId(user.id);
        console.log(user.id);
      }
    }
    getUser();
  }, [userId]);

  // console.log(userId);

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
          {userId === 'not_auth' && <NavList icon='signin' to='/auth/login' />}
          {userId !== 'not_auth' && <NavList icon='signout' to='#' />}
          {userId !== 'not_auth' && <NavList icon='user' to='/user' />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
