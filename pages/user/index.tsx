import Image from 'next/image';
import { Layout } from '../../components';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';
import styles from './user.module.css';

const User = () => {
  const [score, setScore] = useState<number>(0);
  const [userObj, setUserObj] = useState<any>({});

  useEffect(() => {
    async function getPoints() {
      const user = supabase.auth.user();
      if (user === null) {
        setScore(0);
      } else {
        setUserObj(user);
        const { data: userData } = await supabase
          .from('user')
          .select('points')
          .eq('user_id', user.id)
          .single();

        setScore(userData.points);
      }
    }
    getPoints();
  }, []);

  return (
    <Layout>
      <section className={styles.userHero}>
        <div className={styles.heroImage}>
          <Image
            src='/static/e_animated.gif'
            alt='ethereum_2'
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className={styles.userContainer}>
        <h1>user profile</h1>
        <div className={styles.userHeading}>
          <p>{userObj.email}</p>
          <p className={styles.points}>total points: {score}</p>
        </div>
      </section>
    </Layout>
  );
};

export default User;
