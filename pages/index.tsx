import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from '../components';
import styles from '../styles/Home.module.css';
import { HompageCard } from '../components';

const Home = () => {
  return (
    <Layout>
      <section className={styles.homepageHero}>
        <div className={styles.heroImage}>
          <Image
            src='/static/e_animated.gif'
            alt='ethereum_2'
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className={styles.homepageContainer}>
        <h1>SELECT CATEGORY</h1>
        <div className={styles.cardContainer}>
          <HompageCard
            title='Basics of Blockchain'
            imageUrl='https://www.pandasecurity.com/en/mediacenter/src/uploads/2017/09/IMG-MC-blockchain.jpg'
          />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
