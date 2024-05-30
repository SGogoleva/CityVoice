type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  placeholder: string;
  className: string;
};

const Input: React.FC<InputProps> = ({
  onChange,
  name,
  value,
  placeholder,
  className,
}) => {
  return (
    <input
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
