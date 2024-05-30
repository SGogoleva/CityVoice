type ButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    title: string;
    className: string;
}

const Button: React.FC<ButtonProps> = ({onClick, title, className}) => {
    return (<button onClick={onClick} title={title} className={className}/>)
}

export default Button