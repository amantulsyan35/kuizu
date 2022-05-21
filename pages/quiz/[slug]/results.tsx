import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Layout, QuizInput } from '../../../components';
import { blockchainBasics } from '../../../data/blockchain-basics-questions';
import { useQuestionData } from '../../../context/question-context';
import styles from '../../../styles/results.module.css';

const Result = () => {
  const [correct, setCorrect] = useState(0);

  const {
    questionState: { userAnswers },
    questionDispatch,
  } = useQuestionData();

  //   useEffect(() => {
  //     userAnswers.map((answer, i) =>
  //       answer.selectedOption === blockchainBasics[i].answer ?  :
  //     );
  //   }, [userAnswers, correct]);

  return (
    <Layout>
      <section className={styles.resultHero}>
        <div className={styles.heroImage}>
          <Image
            src='/static/e_animated.gif'
            alt='ethereum_2'
            width={128}
            height={128}
          />
        </div>
      </section>
      <section className={styles.resultsContainer}>
        <h1>Results</h1>
        <p className={styles.resultStat}>2 / 5 answers correct</p>

        <div className={styles.results}>
          {blockchainBasics.map((questionDetails, questionIndex) => {
            return (
              <div key={questionDetails.id} className={styles.resultQuestion}>
                <p className={styles.resultStat}>
                  <b>
                    {questionDetails.id}: {questionDetails.question}
                  </b>
                </p>
                {questionDetails.options.map((questionOption, optionIndex) => {
                  return (
                    <QuizInput
                      key={optionIndex}
                      option={questionOption}
                      value={userAnswers[questionIndex]?.selectedOption}
                      checked={
                        userAnswers[questionIndex]?.selectedOption ===
                        questionOption
                      }
                      handleChange={() => {}}
                    />
                  );
                })}
                <p className={styles.correctAnswer}>
                  correct answer: {questionDetails.answer}
                </p>
              </div>
            );
          })}
        </div>
        <div className={styles.resultContainerButtons}>
          <button>Retake Quiz</button>
        </div>
      </section>
    </Layout>
  );
};

export default Result;
