import Image from 'next/image';
import { Layout } from '../../components';
import styles from './user.module.css';

const User = () => {
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
          <p>amantulsyan35@gmail.com</p>
          <p className={styles.points}>total points: 300</p>
        </div>
        <h3>proof of completion</h3>
        <div className={styles.completedContainer}>
          <div className={styles.completed}>x</div>
          <div className={styles.completed}>x</div>
          <div className={styles.completed}>x</div>
        </div>
      </section>
    </Layout>
  );
};

export default User;
