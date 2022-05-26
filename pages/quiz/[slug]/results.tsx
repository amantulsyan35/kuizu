import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout, QuizInput } from '../../../components';
import { blockchainBasics } from '../../../data/blockchain-basics-questions';
import { useQuestionData } from '../../../context/question-context';
import supabase from '../../../lib/supabase';
import styles from '../../../styles/results.module.css';

const Result = () => {
  const params = useRouter();
  const [correct, setCorrect] = useState<number>(0);

  useEffect(() => {
    const correctAnswers = userAnswers?.filter(
      (answer, i) => answer.selectedOption !== blockchainBasics[i].answer
    );
    setCorrect(correctAnswers.length);
  }, []);

  const {
    questionState: { userAnswers },
    questionDispatch,
  } = useQuestionData();

  const handleNft = () => {
    alert('hii');
  };

  const handleRetake = () => {
    // params.push(`/quiz/${params.query.slug}`);
  };

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
        <p className={styles.resultStat}>
          {correct} / {userAnswers?.length} answers correct
        </p>

        <div className={styles.results}>
          {blockchainBasics.map((questionDetails, questionIndex) => {
            return (
              <div key={questionDetails.id} className={styles.resultQuestion}>
                <p className={styles.resultStat}>
                  {questionDetails.id}: {questionDetails.question}
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
          {correct === userAnswers.length ? (
            <button onClick={handleNft}>Claim NFT</button>
          ) : (
            <Link href='/'>
              <button onClick={handleRetake}>Retake Quiz</button>
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Result;
