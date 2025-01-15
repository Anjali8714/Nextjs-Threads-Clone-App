import { ErrorMessage, Field } from "formik";
import React from "react";

interface TextInputProps {
  name: string;
  type: string;
  placeholder: string;
  className?: string;
}

const TextInputBox: React.FC<TextInputProps> = ({
  name,
  type,
  placeholder,
  className = "",
}) => {
  return (
    <div className="mt-4">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={`mt-2 w-full h-16 px-4 py-2 bg-black text-black border rounded-lg ${className}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 mt-1"
      />
    </div>
  );
};

export default TextInputBox;
