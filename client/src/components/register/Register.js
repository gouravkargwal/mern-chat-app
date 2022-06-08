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
    .min(5, "Username must have 5 characters"),
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
  }, []);

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
      <Form className="flex flex-col justify-center items-center h-screen bg-gradient-to-tl from-fuchsia-500 via-red-400 to-emerald-200">
        <div className="bg-gray-200 rounded-md w-[80vw] max-w-md p-3 flex flex-col gap-4 ">
          <h2 className="text-center font-sans font-bold text-xl">Register</h2>
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="p-3 rounded block border-purple-500 w-full border-2  focus: outline-none focus:ring focus:border-blue-500 "
          />
          <ErrorMessage name="username" component={TextError} />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded block border-purple-500 w-full border-2 focus: outline-none focus:ring focus:border-blue-500 "
          />
          <ErrorMessage name="email" component={TextError} />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded block border-purple-500 w-full border-2 focus: outline-none focus:ring focus:border-blue-500 "
          />
          <ErrorMessage name="password" component={TextError} />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-3 rounded block border-purple-500 w-full border-2 focus: outline-none focus:ring focus:border-blue-500 "
          />
          <ErrorMessage name="confirmPassword">
            {(errMsg) => {
              return <div className="text-green-500">{errMsg}</div>;
            }}
          </ErrorMessage>
          <button
            type="submit"
            className="p-3 w-full cursor-pointer rounded-md bg-purple-800 text-white block hover:bg-purple-700"
          >
            Submit
          </button>
          <span>
            Already have a account?
            <Link to="/login" className="hover:underline text-purple-500">
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
