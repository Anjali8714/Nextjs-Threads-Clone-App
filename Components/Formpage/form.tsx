"use client";

import { Formik, Form } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/APIs/axiosInstance";
import TextInputBox from "@/ReusableCode/textInputBox";
import ButtonComponent from "@/ReusableCode/buttonComponent";
import { setCookie } from "@/APIs/Cookie/setCookie";

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
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Formpage = () => {

  const router = useRouter();

  const loginUSer = async (userData: UserLoginData) => {
    try {
      const res = await axiosInstance.post("/users/login", userData);
      return res.data;
    } catch (error: any) {
      console.error("Login error :", error);
      throw error;
    }
  };

 

  const onSubmit = async (values: UserLoginData) => {
    const user = await loginUSer(values);

    if (user && user._id) {
      const userID = user._id;
      await setCookie(userID);
      localStorage.setItem('userId',userID)
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
              <TextInputBox
                type="text"
                name="username"
                placeholder="Username"
              />
              <TextInputBox
                type="password"
                name="password"
                placeholder="Password"
              />

              <ButtonComponent
                type="submit"
                label="Log In"
                className="bg-white text-slate-400 mt-4"
              />

              <div className="flex items-center justify-center mt-4">
                <div className="w-full h-px bg-gray-400"></div>
                <p className="px-2 text-gray-400 text-sm">or</p>
                <div className="w-full h-px bg-gray-400"></div>
              </div>

              <Link href="/Signup">
                <ButtonComponent
                  label="Sign up"
                  className="bg-transparet rounded-xl block w-full px-3 mt-2 text-white"
                />
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Formpage;
