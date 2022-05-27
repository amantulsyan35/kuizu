import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../../components';
import { FaEthereum } from 'react-icons/fa';
import supabase from '../../../lib/supabase';
import styles from '../../../styles/quiz.module.css';

type QuizStats = {
  title: string;
  desc: string | number;
};

interface QuizDetailsObject {
  id: string;
  created_at: Date;
  category: string;
  time_limit: number;
  quiz_points: number;
  instructions: [];
  resources: [];
}

type QuizDetailsProp = {
  quizDetails: QuizDetailsObject[];
};

export const getServerSideProps = async () => {
  const { data: quizDetails, error } = await supabase
    .from('quizDetails')
    .select('*')
    .eq('category', 'blockchain-basics')
    .single();

  return {
    props: {
      quizDetails,
    },
  };
};

type InstructionProp = {
  desc: string;
};

const Instructions = ({ desc }: InstructionProp) => {
  return (
    <div className={styles.instructions}>
      <span>
        <FaEthereum className={styles.instructionIcon} />
      </span>{' '}
      <p>{desc}</p>
    </div>
  );
};

const QuizStats = ({ title, desc }: QuizStats) => {
  return (
    <div className={styles.quizStats}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};

const QuizIntro = ({ quizDetails }: any) => {
  const params = useRouter();

  useEffect(() => {}, []);

  return (
    <Layout>
      <section className={styles.quizIntroHero}>
        <div className={styles.heroImage}>
          <Image
            src='/static/e_animated.gif'
            alt='ethereum_2'
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className={styles.quizContainer}>
        <div className={styles.quizHeading}>
          <h1>Basics Of Blockchain </h1>
          <p>Read the following instructions carefully</p>
        </div>
        <div className={styles.iframe}>
          <iframe
            width='1246'
            height='701'
            src='https://www.youtube.com/embed/uH8RDm5ewis'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          />
        </div>
        <div className={styles.quizDetails}>
          <div className={styles.quizImage}>
            <img src={quizDetails.imgUrl} alt='blockchain' />
          </div>
          <div className={styles.quizStatsContainer}>
            <QuizStats title='Date:' desc={Date.toString()} />
            <QuizStats
              title='Time Limit:'
              desc={`${quizDetails.time_limit} mins`}
            />
            <QuizStats title='Attempts:' desc={quizDetails.attempts} />
            <QuizStats title='Points:' desc={quizDetails.quiz_points} />
          </div>
        </div>
        <h3>Instructions</h3>
        <div className={styles.instructionContainer}>
          {quizDetails.instructions.map((i: string, index: number) => {
            return <Instructions key={index} desc={i} />;
          })}
        </div>

        <h3>Few Resources to get you started</h3>
        <div className={styles.instructionContainer}>
          {quizDetails.resources.map((r: string, i: number) => {
            return (
              <Fragment key={i}>
                <Link href={r}>
                  <a>
                    <Instructions desc={r} />
                  </a>
                </Link>
              </Fragment>
            );
          })}
        </div>
        <h3>Before starting One last thing</h3>
        <div className={styles.quizStart}>
          <img src='https://media2.giphy.com/media/kDZMoj30w3OswLR08v/giphy.gif' />
        </div>
        <Link href={`/quiz/${params.query.slug}/questions`}>
          <button className={styles.startButton}>start</button>
        </Link>
      </section>
    </Layout>
  );
};

export default QuizIntro;
