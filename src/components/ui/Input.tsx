import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputField: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`flex-grow p-2 border rounded-md ${className}`}
    />
  );
};

export default InputField;
