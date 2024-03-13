import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    style?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children ,style, onClick }) => {
    const buttonStyle = style? style: 'bg-transparent hover:bg-[rgba(255,255,255,0.4)] text-black dark:text-white font-bold py-2 px-4 rounded';

    return (
        <button className={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
