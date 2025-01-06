"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

interface UserLoginData {
  email: string;
  password: string;
}

const Logindatas: UserLoginData = {
  email: "",
  password: "",
};

const validation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password minimum 8 digits")
    .required("Required"),
});

const Formpage = () => {

  const router = useRouter();


  const onSubmit = (values: UserLoginData) => {
    console.log("Login data", values);

    setTimeout(()=> {
      router.push("/Navbar")
    },500)
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-white mb-6">Login with your Instagram account</h2>

        <Formik
          initialValues={Logindatas}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="mt-2 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-2 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-4 w-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                LOGIN
              </button>

              <div className="flex items-center justify-center mt-4">
                <div className="w-full h-px bg-gray-400"></div>
                <p className="px-2 text-gray-400 text-sm">or</p>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              <Link href="/Signup" />
              <button
              
              className="bg-transparet rounded-xl block w-full px-3 mt-2 text-white">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Formpage;