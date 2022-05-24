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

type FormInputProps = {
  label: string;
  type: string;
  placeholder?: any;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const FormInput = ({
  label,
  type,
  placeholder,
  className,
  onChange,
  name,
}: FormInputProps) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder ? placeholder : null}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
