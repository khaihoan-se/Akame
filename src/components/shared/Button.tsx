import React from "react";

interface ButtonProps {
    onClick?: () => void;
    classButton?: string;
    title: string;
}
const Button: React.FC<ButtonProps> = ({ onClick, classButton, title, ...props }) => {
    return <button {...props} className={classButton} onClick={onClick}>{title}</button>
}

export default Button;