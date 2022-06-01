import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Layout } from '../components';
import styles from '../styles/Home.module.css';
import { HompageCard } from '../components';
import supabase from '../lib/supabase';

interface CategoryObject {
  id: number;
  created_at: Date;
  name: string;
  img_url: string;
}

type CategoryType = {
  categories: CategoryObject[];
  completed: boolean;
};

export const getServerSideProps = async () => {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  return {
    props: {
      categories,
    },
  };
};

const Home = ({ categories, completed }: CategoryType) => {
  const [isCompleted, setisCompleted] = useState(false);

  useEffect(() => {
    async function getCompleted() {
      const user = await supabase.auth.user();

      if (user) {
        const { data: completed } = await supabase
          .from('completed')
          .select('isCompleted')
          .eq('user_id', user.id)
          .single();
        setisCompleted(completed && completed.isCompleted);
      }
    }

    getCompleted();
  });

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
          {categories &&
            categories.map((c) => {
              return (
                <HompageCard
                  key={c.id}
                  title={c.name}
                  imageUrl={c.img_url}
                  completed={isCompleted}
                />
              );
            })}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
