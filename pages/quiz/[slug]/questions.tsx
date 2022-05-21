import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, QuizInput } from '../../../components';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../../styles/question.module.css';
import { useQuestionData } from '../../../context/question-context';
import { blockchainBasics } from '../../../data/blockchain-basics-questions';
import { Fragment } from 'react';

type QuizStateProps = {
  questionNumber: number;
};

const Questions = () => {
  const {
    questionState: { userAnswers },
    questionDispatch,
  } = useQuestionData();

  const params = useRouter();

  const [state, setState] = useState<QuizStateProps>({
    questionNumber: 0,
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    questionDispatch({
      type: 'SET_USER_ANSWERS',
      payload: {
        questionIndex: state.questionNumber + 1,
        selectedOption: e.target.name,
      },
    });
  };

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
        <p>
          Question {state.questionNumber + 1} / {blockchainBasics.length} :
        </p>
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
        <div className={styles.quizContainerButtons}>
          {state.questionNumber > 0 && (
            <button
              onClick={handlePrevButton}
              disabled={state.questionNumber < 0 ? true : false}
            >
              Prev Question
            </button>
          )}
          {state.questionNumber < 9 && (
            <button
              onClick={handleNextButton}
              disabled={state.questionNumber > 9 ? true : false}
            >
              Next Question
            </button>
          )}
          {state.questionNumber > 8 && (
            <Link href={`/quiz/${params.query.slug}/results`}>
              <a>
                <button onClick={handleNextButton}>Submit</button>
              </a>
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Questions;
