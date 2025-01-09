"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/APIs/axiosInstance";

export interface UserLoginData {
  username: string;
  password: string;
}

const Logindatas: UserLoginData = {
  username: "",
  password: "",
};

const validation = Yup.object({
  username: Yup.string().required("Username is Required"),
  password: Yup.string()
    .min(8, "Password minimum 8 digits")
    .required("Required"),
});

const Formpage = () => {
  const loginUSer = async (userData: UserLoginData) => {
    console.log(userData);
    try {
      const res = await axiosInstance.post("/users/login", userData);
      return res.data;
    } catch (error: any) {
      console.error("Login error :", error);
      throw error;
    }
  };

  const router = useRouter();

  const onSubmit = async (values: UserLoginData) => {
    const user = await loginUSer(values);

    if (user && user._id) {
      router.push("/Main");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg mt-28">
        <h2 className="text-l font-semibold text-center text-white mb-1">
          Login with your Instagram account
        </h2>

        <Formik
          initialValues={Logindatas}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="mt-2 w-full h-16 px-4 py-2 bg-zinc-800 text-white border  rounded-lg"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-2 w-full h-16 px-4 py-2 bg-zinc-800 text-white border  rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-slate-400 rounded-lg px-4 py-2 mt-4 w-full h-16"
              >
                Log in
              </button>

              <div className="flex items-center justify-center mt-4">
                <div className="w-full h-px bg-gray-400"></div>
                <p className="px-2 text-gray-400 text-sm">or</p>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              <Link href="/Signup">
                <button className="bg-transparet rounded-xl block w-full px-3 mt-2 text-white">
                  Sign Up
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Formpage;
