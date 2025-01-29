"use client";

import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/APIs/axiosInstance";
import TextInputBox from "@/ReusableCode/textInputBox";
import { toast, ToastContainer } from "react-toastify";


interface UserSignupData {
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
}

const Signupdatas: UserSignupData = {
  name: "",
  username: "",
  email: "",
  phonenumber: "",
  password: "",
};

const validation = Yup.object({
  name: Yup.string().required("Name is Required"),
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password minimum 8 digits")
    .required("Required"),
});

const Signup: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const signup = async (userData: UserSignupData) => {
    try {
      console.log(userData);
      const response = await axiosInstance.post("/users/signup", userData);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  // const onSubmit = async (values: UserSignupData) => {
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     const res = await signup(values);
  //     setLoading(false);
  //     if (res) {
  //       // console.log(res.message)
  //       router.push("/Login");
  //     }
  //   } catch (error: any) {
  //     setLoading(false);

  //     const errorMessage = error.response?.data || "Signup failed. Please try again.";
  //     setError(errorMessage);
  //   }
  // };

  const onSubmit = async (values: UserSignupData) => {
    setError(null);
    setLoading(true);

    const res = await signup(values);
    toast.success("Registration successfully...")
    setLoading(false);

   

    if (res) {
      router.push("/Login");
    } else {
      setError("Signup failed..Please try again...");
    }
  };

  return (
    <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
        <h1 className="text-lg font-semibold text-white text-center mb-8">Create your account</h1>
        <ToastContainer position="bottom-center" />
        <Formik
          initialValues={Signupdatas}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              
                <TextInputBox type="text" name="name" placeholder="Name"/>
                <TextInputBox type="text" name="username" placeholder="Username"/>
                <TextInputBox type="email" name="email" placeholder="E-mail"/>
                <TextInputBox type="tel" name="phonenumber" placeholder="Phone Number"/>
                <TextInputBox type="password" name="password" placeholder="Password"/>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="bg-white text-gray-500 rounded-xl px-3 py-2 mt-4 w-full"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {error && (
                <div className="text-red-500 mt-2 text-center">{error}</div>
              )}

              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
