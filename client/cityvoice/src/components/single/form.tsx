type FormProps = {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className: string;
};

const Form: React.FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};
export default Form;
