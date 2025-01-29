'use client'

import React from 'react'

interface ButtonProps {
    type? : "button" | "submit" | "reset";
    label : string;
    className? : string;

}

const ButtonComponent:React.FC<ButtonProps> = ({type , label , className}) => {
  return (
    <button type={type} className={`rounded-lg px-4 py-2 w-full h-16 ${className}`}>
      {label}
    </button>
  )
}

export default ButtonComponent
