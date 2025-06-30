import React from "react";
import { Link, useAsyncValue, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import useAxios from "../Hook/useAxios";

const Register = () => {
  const { handleRegister, user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const userObj = {
      name,
      email,
      pass,
      role: "customer",
    };

    handleRegister(email, pass)
      .then((userCredential) => {
        const userData = userCredential.user;
        axiosSecure.post("/users", userObj).then((res) => {
          Swal.fire({
            title: "Registered",
            icon: "success",
          });
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: "Error",
          icon: "error",
        });
      });
  }
  return (
    <div>
      <div className="mx-auto max-w-screen-xl bg-base-300 px-4 py-16 sm:px-6 lg:px-8 mt-8 rounded-md">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <form
            onSubmit={handleSignUp}
            className="mt-6 mb-0 space-y-4 bg-white rounded-lg p-4 shadow-xl sm:p-6 lg:p-8"
            onSubmit={handleSignUp}
          >
            <p className="text-center text-lg font-medium">
              Create your account
            </p>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-xs"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-xs"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="pass"
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to={"/login"}
                className="underline text-indigo-600 font-bold"
              >
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
