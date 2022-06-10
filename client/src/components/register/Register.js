import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../utils/TextError";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import appConstant from "../../utils/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formSchema = Yup.object({
  username: Yup.string()
    .required("Required!")
    .min(3, "Username must have 3 characters")
    .max(8, "Username must'n exceed 8 characters"),
  email: Yup.string().email("Invalid Email Format").required("Required!"),
  password: Yup.string().required("Required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Register = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    console.log(values);
    axios
      .post(`${appConstant.authURL}/register`, values)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((error) => {
        toast(error.response.data.error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={formSchema}
    >
      <Form className="flex flex-col justify-center items-center h-screen bg-[#0f360a]">
        <div className="bg-[#cef5c9] rounded-md w-[80vw] max-w-md p-3 flex flex-col gap-4 ">
          <h2 className="text-center font-sans font-bold text-xl text-[#0f360a]">
            Register
          </h2>
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="p-3 rounded block border-[#0f360a] w-full border-2  focus: outline-none focus:border-[#4cda3a] "
          />
          <ErrorMessage name="username" component={TextError} />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded block border-[#0f360a] w-full border-2 focus: outline-none focus:border-[#4cda3a] "
          />
          <ErrorMessage name="email" component={TextError} />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded block border-[#0f360a] w-full border-2 focus: outline-none focus:border-[#4cda3a] "
          />
          <ErrorMessage name="password" component={TextError} />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-3 rounded block border-[#0f360a] w-full border-2 focus: outline-none focus:border-[#4cda3a] "
          />
          <ErrorMessage name="confirmPassword">
            {(errMsg) => {
              return <div className="text-red-500">{errMsg}</div>;
            }}
          </ErrorMessage>
          <button
            type="submit"
            className="p-3 w-full cursor-pointer rounded-md bg-[#0f360a] text-white block hover:bg-[#effced] hover:text-[#0f360a] duration-500"
          >
            Submit
          </button>
          <span className="text-black">
            Already have a account?
            <Link
              to="/login"
              className="hover:underline text-[#23691a] duration-500 ml-1"
            >
              Login
            </Link>
          </span>
        </div>
        <ToastContainer />
      </Form>
    </Formik>
  );
};

export default Register;
