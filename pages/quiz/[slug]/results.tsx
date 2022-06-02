import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import supabase from '../../../lib/supabase';
import { Layout, QuizInput } from '../../../components';
import { blockchainBasics } from '../../../data/blockchain-basics-questions';
import { useQuestionData } from '../../../context/question-context';
import styles from '../../../styles/results.module.css';
import { requireAuthentication } from '../../../HOC/requireAuthentication';
import { toast } from 'react-toastify';

const Result = () => {
  const params = useRouter();
  const [correct, setCorrect] = useState<number>(0);

  useEffect(() => {
    const correctAnswers = userAnswers?.filter(
      (answer, i) =>
        answer.selectedOption.trim() !== blockchainBasics[i].answer.trim()
    );

    setCorrect(correctAnswers.length === 0 ? 10 : correctAnswers.length);
  }, []);

  const {
    questionState: { userAnswers },
  } = useQuestionData();

  const handleNft = async () => {
    const user = supabase.auth.user();

    if (user === null) {
      toast.error('User not defined');
    } else {
      const { data, error } = await supabase
        .from('user')
        .insert({ points: 300, user_id: user.id });

      if (error) {
        throw new Error(error.message);
      }
    }
  };

  const handleRetake = () => {
    params.push(`/quiz/${params.query.slug}`);
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
            <button onClick={handleRetake}>Retake Quiz</button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Result;

export const getServerSideProps = requireAuthentication(async (ctx) => {
  return {
    props: {},
  };
});
