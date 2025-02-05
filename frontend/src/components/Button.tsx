import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="bg-blue-700 p-3 rounded-lg text-white hover:bg-blue-900"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
