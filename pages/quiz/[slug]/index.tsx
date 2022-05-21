import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, VideoPlayer } from '../../../components';
import { FaEthereum } from 'react-icons/fa';
import styles from '../../../styles/quiz.module.css';

type QuizStats = {
  title: string;
  desc: string | number;
};

const Instructions = () => {
  return (
    <div className={styles.instructions}>
      <span>
        <FaEthereum className={styles.instructionIcon} />
      </span>{' '}
      <p>
        This quiz consists of 5 multiple-choice questions. To be successfull
        with the quizes, it is important to be conversant with all the topics.
      </p>
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

const QuizIntro = () => {
  const params = useRouter();

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
            <img
              src='https://assets.materialup.com/uploads/75954ef2-8be1-4e59-b1b9-116231282937/preview.png'
              alt='blockchain'
            />
          </div>
          <div className={styles.quizStatsContainer}>
            <QuizStats title='Date:' desc='6/5/2022' />
            <QuizStats title='Time Limit:' desc='30 min' />
            <QuizStats title='Attempts:' desc={3} />
            <QuizStats title='Points:' desc={200} />
          </div>
        </div>
        <h3>Instructions</h3>
        <div className={styles.instructionContainer}>
          <Instructions />
          <Instructions />
          <Instructions />
        </div>

        <h3>Few Resources to get you started</h3>
        <div className={styles.instructionContainer}>
          <Link href=''>
            <a>
              <Instructions />
            </a>
          </Link>
          <Link href=''>
            <a>
              <Instructions />
            </a>
          </Link>
          <Link href=''>
            <a>
              <Instructions />
            </a>
          </Link>
        </div>
        <h3>Before starting One last thing</h3>
        <div className={styles.quizStart}>
          <img src='https://media2.giphy.com/media/kDZMoj30w3OswLR08v/giphy.gif' />
        </div>
        <Link href={`${params.query.slug}/questions`}>
          <button className={styles.startButton}>start</button>
        </Link>
      </section>
    </Layout>
  );
};

export default QuizIntro;
