import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import SuccessAnimation from "../../../components/Success/SuccessAnimation";
import { AtSign, Lock, Shield } from "react-feather";
import ErrorPopUp from "../../../components/Error/ErrorPopUp";

export default function SignUpForm({ onSignupSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const signUp = async (username, password, confPassword) => {
    setIsRegistering(true);
    setErrorMessage(null);
    setIsSuccess(false); // Reset the success state

    const signUpData = {
      username,
      password,
      confPassword,
    };

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${baseURL}/api/authentication/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.errors) {
          throw new Error(`${responseData.message}`);
        } else {
          throw new Error(
            `Server returned ${response.status} ${response.statusText}`
          );
        }
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          onSignupSuccess();
          reset();
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
    setIsRegistering(false);
  };

  const onSubmit = async (data) => {
    try {
      await signUp(data.username, data.password, data.confPassword);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isSuccess && !isRegistering ? (
          <div className="flex flex-col items-center text-center justify-center my-8">
            <SuccessAnimation />
            <h2 className="mt-4 dark:text-silver-400 not-italic text-lg">
              Your account has been registered!
            </h2>
            <h3 className="mt-2 dark:text-silver-400 not-italic text-lg">
              Login to continue!
            </h3>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-7"
          >
            {errorMessage && (
              <ErrorPopUp
                error={errorMessage}
                clearErrorMessage={clearErrorMessage}
              />
            )}
            <div
              className="form-fields flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
        max-h-[800px] w-[450px] mx-auto"
            >
              <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-rock-blue-500">
                    <AtSign size={20} strokeWidth={3} />
                  </div>
                  <input
                    type="text"
                    {...register("username", {
                      required: "Username is required.",
                    })}
                    placeholder="Username"
                    autoComplete="off"
                    className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                  />
                </div>
                {errors.username && (
                  <p className="errorMsg mt-3 text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-rock-blue-500">
                    <Lock size={20} strokeWidth={3} />
                  </div>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      validate: {
                        checkLength: (value) => value.length >= 8,
                        matchPattern: (value) =>
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                            value
                          ),
                      },
                    })}
                    placeholder="Password"
                    className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                  />
                </div>
                {errors.password?.type === "required" && (
                  <p className="errorMsg mt-3 text-red-400">
                    Password is required.
                  </p>
                )}
                {errors.password?.type === "checkLength" && (
                  <p className="errorMsg mt-3 text-red-400">
                    Password should be at least 8 characters.
                  </p>
                )}
                {errors.password?.type === "matchPattern" && (
                  <p className="errorMsg mt-3 text-red-400">
                    Password should contain at least one uppercase letter,
                    lowercase letter, digit, and special symbol.
                  </p>
                )}
              </div>
              <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-rock-blue-500">
                    <Shield size={20} strokeWidth={3} />
                  </div>
                  <input
                    type="password"
                    {...register("confPassword", {
                      required: true,
                    })}
                    placeholder="Confirm password"
                    className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                  />
                </div>
                {/* errors will return when field validation fails  */}
                {/* here we watch the both password and confirm password filed and if both not match, trigger the validation */}
                {watch("confPassword") !== watch("password") &&
                getValues("confPassword") ? (
                  <p className="errorMsg mt-3 text-red-400">
                    Passwords does not match
                  </p>
                ) : null}
              </div>
              <div className="form-control text-start border-0 mb-2.5 p-[15px] text-lg font-semibold text-dove-gray-500 rounded-md">
                <label className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms", {
                      required:
                        "You must agree to the terms and conditions before you can proceed.",
                    })}
                    className="mr-4 ml-1.5 leading-tight border-alto-200 rounded-2xl bg-opacity-70 h-5 w-5 cursor-pointer"
                  />
                  I agree to the terms and conditions
                </label>
                {errors.agreeToTerms && (
                  <p className="errorMsg mt-3 text-red-400">
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </div>
              <div className="form-control border-0 mb-2.5 p-3 font-semibold text-lg text-dove-gray-500 rounded-md">
                <button
                  type="submit"
                  className="border-0 w-full cursor-pointer py-[15px] px-0 uppercase rounded-md text-white text-base bg-rock-blue-500 shadow-sm transition-all duration-200 ease-linear
                  hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
                  dark:text-eerie-black-950 dark:bg-rock-blue-400 dark:hover:bg-rock-blue-500 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
