import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';

interface ICardProps {
  title: string;
  imageUrl: string;
}

export const HompageCard = ({ title, imageUrl }: ICardProps) => {
  return (
    <Link href='/quiz/blockchain-basics'>
      <a>
        <div className={styles.quizCard}>
          <h4>{title}</h4>
          <div className={styles.quizCardImg}>
            <Image src={imageUrl} alt={title} width={300} height={150} />
          </div>
        </div>
      </a>
    </Link>
  );
};
