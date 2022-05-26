import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, QuizInput } from '../../../components';
import { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import styles from '../../../styles/question.module.css';
import { useQuestionData } from '../../../context/question-context';
import { blockchainBasics } from '../../../data/blockchain-basics-questions';
import supabase from '../../../lib/supabase';

type QuizStateProps = {
  questionNumber: number;
};

type TimerStateType = {
  minute: number;
  second: number;
  status?: string;
};

type QuizQuestionType = {
  id: number;
  created_at: Date;
  question: string;
  options: [];
  category: string;
};

type QuizType = {
  quiz: QuizQuestionType;
};

export async function getServerSideProps() {
  const { data: quiz, error } = await supabase.from('quiz').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      quiz,
    },
  };
}

const Questions = ({ quiz }: QuizType) => {
  const {
    questionState: { userAnswers },
    questionDispatch,
  } = useQuestionData();

  const params = useRouter();

  const [state, setState] = useState<QuizStateProps>({
    questionNumber: 0,
  });

  const [timer, setTimer] = useState<TimerStateType>({
    minute: 14,
    second: 59,
    status: '',
  });

  const handleNextButton = () => {
    if (userAnswers[state.questionNumber]) {
      setState((state) => ({
        ...state,
        questionNumber: state.questionNumber + 1,
      }));
    } else {
      alert('select option first');
    }
  };

  const handlePrevButton = () => {
    setState((state) => ({
      ...state,
      questionNumber: state.questionNumber - 1,
    }));
  };

  const handleResultsButton = () => {
    params.push(`/quiz/${params.query.slug}/results`);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    questionDispatch({
      type: 'SET_USER_ANSWERS',
      payload: {
        questionIndex: state.questionNumber + 1,
        selectedOption: e.target.name,
      },
    });
  };
  let countDownDate = new Date().getTime() + 15 * 60 * 1000;

  const getTime = () => {
    const intervalId = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (seconds < 10) {
        seconds = 0 + seconds;
      } else if (minutes < 10) {
        minutes = 0 + minutes;
      }

      setTimer({ ...timer, minute: minutes, second: seconds });

      if (distance < 0) {
        clearInterval(intervalId);
        setTimer({ ...timer, status: 'Timeout' });
      }
    }, 1000);
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <Layout>
      <section className={styles.questionHero}>
        <div className={styles.heroImage}>
          <Image
            src='/static/e_animated.gif'
            alt='ethereum_2'
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className={styles.quizQuestionContainer}>
        <h1>Basics Of Blockchain </h1>

        <div className={styles.statsContainer}>
          <p>
            Question {state.questionNumber + 1} / {blockchainBasics.length} :
          </p>

          {timer.status === '' && (
            <p>
              {timer.minute}:{timer.second}{' '}
            </p>
          )}
        </div>

        {timer.status ? (
          <h2 className={styles.timeoutHeading}>sorry you ran out of time</h2>
        ) : (
          <div className={styles.quizContainer}>
            {blockchainBasics.map((questionDetails, questionIndex) => {
              if (questionIndex === state.questionNumber) {
                return (
                  <Fragment key={questionDetails.id}>
                    <p>
                      <b>{questionDetails.question}</b>
                    </p>
                    {questionDetails.options.map(
                      (questionOption, optionIndex) => {
                        return (
                          <QuizInput
                            key={optionIndex}
                            option={questionOption}
                            checked={
                              userAnswers.length !== 0 &&
                              userAnswers[state.questionNumber]
                                ?.selectedOption === questionOption
                            }
                            value={questionOption}
                            handleChange={handleRadioChange}
                          />
                        );
                      }
                    )}
                  </Fragment>
                );
              }
            })}
          </div>
        )}
        <div className={styles.quizContainerButtons}>
          {state.questionNumber > 0 && (
            <button
              onClick={handlePrevButton}
              disabled={state.questionNumber < 0 ? true : false}
            >
              Prev Question
            </button>
          )}
          {state.questionNumber < 9 && timer.status === '' && (
            <button
              onClick={handleNextButton}
              disabled={state.questionNumber > 9 ? true : false}
            >
              Next Question
            </button>
          )}

          {state.questionNumber > 8 && (
            <button onClick={handleResultsButton}>Submit</button>
          )}
          {timer.status !== '' && (
            <Link href={`/quiz/${params.query.slug}/`}>
              <a>
                <button>Retake Quiz</button>
              </a>
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Questions;
