import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    style?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children ,style, onClick }) => {
    const buttonStyle = style? style: 'bg-transparent hover:bg-white bg-opacity-0.9 text-black dark:text-white font-bold py-2 px-4 rounded';

    return (
        <button className={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
