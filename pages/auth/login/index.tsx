import { useState } from 'react';
import { Layout, FormInput } from '../../../components';
import { useRouter } from 'next/router';
import supabase from '../../../lib/supabase';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({ email });
    router.push('/');
    alert('welcome aman');

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Layout>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.loginHeading}>
            <h4>Login</h4>
          </div>
          <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <FormInput
              label='EMAIL'
              type='email'
              placeholder='Enter your email'
              name='email'
              className='form-group'
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type='submit' className={styles.loginButton}>
              Login
            </button>
            <div className={styles.formFooter}>
              <p>Login through confirmation email</p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
