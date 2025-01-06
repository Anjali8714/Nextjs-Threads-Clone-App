import React from "react";
import Image from "next/image";
import Formpage from "@/Components/Formpage/form";
import BG from '../../../public/Images/bg.webp'

const Login = () => {
  return (

   
    
    <div className="relative w-full h-screen "> 
      <Image
        src={BG} 
        alt="Background Image"
        className="absolute inset-0 z-[-1] w-full"
        objectFit="cover"
       
      /> 
       <Formpage/>   
     </div> 
    
    
    
  )};

export default Login;