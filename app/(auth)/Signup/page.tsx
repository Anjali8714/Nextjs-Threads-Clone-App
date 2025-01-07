"use client";

import { Formik, Form, Field, ErrorMessage } from "formik"
import React from "react"
import * as Yup from "yup"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserSignupData {
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  confirmpassword: string;
}

const Signupdatas: UserSignupData = {
  name: "",
  username: "",
  email: "",
  phonenumber: "",
  password: "",
  confirmpassword: "",
};
const validation = Yup.object({
  name: Yup.string().required("Name is Required"),
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phonenumber: Yup.string().matches(/^\d{10}$/,"Phone number must be 10 digits").required("Required"),
  password: Yup.string().min(8, "Password minimum 8 digits").required("Required"),
  confirmpassword: Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Required"),
});

const Signup:React.FC = () => {


  const [name,setName] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phonenumber,setPhonenumber] = useState('');
  const [password,setPassword] = useState('');
  const [confirmpassword,setConfirmpassword] = useState('');
  // const [name,setName] = useState('');

  const router = useRouter();


      const onSubmit = (values: UserSignupData) => {
        console.log("Form data", values);

        setTimeout(()=>{
          router.push("/Login");
        },500)

    
  };

  return (
    <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
        <h1 className="text-3xl font-semibold text-white text-center mb-4">SignUp</h1>

        <Formik
          initialValues={Signupdatas}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="tel"
                  name="phonenumber"
                  placeholder="Phonenumber"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 text-white "
                />
                <ErrorMessage
                  name="confirmpassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-xl px-3 py-2 mt-4 w-full"
              >
                SIGN UP
              </button>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;