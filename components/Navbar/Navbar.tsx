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
import { useUser } from '../../context/user-context';

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
  const [user, setUser] = useState<any>(null);
  const { userDispatch } = useUser();

  useEffect(() => {
    async function getUser() {
      const session = supabase.auth.session();
      setUser(session?.user ?? null);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const currentUser = session?.user;
          setUser(currentUser ?? null);
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
    }

    getUser();
  }, [user]);

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
          {!user && <NavList icon='signin' to='/auth/login' />}
          {user && <NavList icon='signout' to='#' />}
          {user && <NavList icon='user' to='/user' />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
