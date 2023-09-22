import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Lock } from "react-feather";
import ErrorPopUp from "../../../components/Error/ErrorPopUp";
import SuccessPopUp from "../../../components/Success/SuccessPopUp";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setJWT } = useContext(AuthContext);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const login = async (username, password) => {
    setIsVerifying(true);
    setErrorMessage(null);

    const loginData = {
      username,
      password,
    };

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${baseURL}/api/authentication/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      setJWT(data.data.token);
    } catch (error) {
      setErrorMessage(error);
    }

    setIsVerifying(false);
  };

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      if (localStorage.getItem("token")) {
        setSuccessMsg("User login is successful!");
        navigate("/", { replace: true });
        setErrorMessage(null);
        reset();
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const clearSuccessMessage = () => {
    setSuccessMsg(null);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-7">
          {isVerifying && (
            <p className="font-bold text-xl text-tundora-700 font-lato tracking-wide">
              Verifying..
            </p>
          )}
          {successMsg && (
            <SuccessPopUp
              message={successMsg}
              clearSuccessMessage={clearSuccessMessage}
            />
          )}
          {errorMessage && (
            <ErrorPopUp
              error={errorMessage}
              clearErrorMessage={clearErrorMessage}
            />
          )}
          <div
            className="form-fields flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
        max-h-[400px] md:w-[450px] mx-auto"
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
            <div className="form-control text-start border-0 mb-2.5 p-[15px] text-lg font-semibold text-dove-gray-500 rounded-md">
              <label className="flex justify-start items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-4 ml-1.5 leading-tight border-alto-200 rounded-2xl bg-opacity-70 h-5 w-5 cursor-pointer"
                />
                Remember me
              </label>
            </div>
            <div className="form-control border-0 mb-2.5 p-3 font-semibold text-lg text-dove-gray-500 rounded-md">
              <button
                type="submit"
                className="border-0 w-full cursor-pointer py-3 px-0 uppercase rounded-md text-white text-lg bg-rock-blue-500 shadow-sm transition-all duration-200 ease-linear
                hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
                dark:text-eerie-black-950 dark:bg-rock-blue-400 dark:hover:bg-rock-blue-500 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
