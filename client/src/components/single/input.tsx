type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  className: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  onChange,
  name,
  type,
  value,
  placeholder,
  className,
  error,
}) => {
  return (
    <input
      onChange={onChange}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className={`${className} ${error ? 'input-error' : ''}`}    />
  );
};

export default Input;
