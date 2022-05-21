import styles from './Input.module.css';

type QuizInputProps = {
  option?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
};

export const QuizInput = ({
  option,
  handleChange,
  checked,
  value,
}: QuizInputProps) => {
  return (
    <div className={styles.formGroup}>
      <input
        type='radio'
        name={option}
        value={value}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      <label>{option}</label>
    </div>
  );
};
