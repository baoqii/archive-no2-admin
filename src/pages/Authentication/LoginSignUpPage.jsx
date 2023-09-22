import LoginForm from "./components/LoginForm";
import { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { motion } from "framer-motion";
import { Variants } from "../../util/AnimationVariables";

const LoginPage = () => {
  const [option, setOption] = useState(1);

  const handleSignupSuccess = () => {
    setOption(1); // Switch to the login form
  };

  const svgInline = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 750"><path fill="#9ba5cb" fill-opacity="0.85" d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,138.7C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> 
  `;
  return (
    <motion.section
      className="relative  w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative text-center shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 p-10 rounded-2xl md:w-[700px] h-[950px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            svgInline
          )}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full flex justify-center">
          <div className="container mt-[100px] text-center">
            <h1 className="text-3xl text-white dark:text-eerie-black-950 tracking-tight font-extrabold font-lato not-italic mx-auto mt-0 mb-[60px] relative h-14 md:w-[450px] overflow-hidden">
              <div
                className={`header-headings flex flex-col w-full absolute transition-all duration-400 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
              ${
                option === 1
                  ? "translate-y-0"
                  : option === 2
                  ? "-translate-y-[62px]"
                  : "-translate-y-[112px]"
              }`}
              >
                <span className="sign-in my-2 mx-0">
                  Sign in to your account
                </span>
                <span className="sign-up my-2 mx-0 ">Create an account</span>
                <span className="forgot my-2 mx-0">Reset your password</span>
              </div>
            </h1>
            <ul className="options flex items-center justify-center text-rock-blue-500 font-lato font-bold text-xl mx-14">
              <li
                className={`cursor-pointer transition-all duration-200 ease-linear hover:opacity-100 active:opacity-100 ${
                  option === 1 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setOption(1)}
              >
                Login
              </li>
              <li
                className={`cursor-pointer ml-4 transition-all duration-200 ease-linear hover:opacity-100 active:opacity-100 ${
                  option === 2 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setOption(2)}
              >
                Sign up
              </li>
              <li
                className={`cursor-pointer ml-auto transition-all duration-200 ease-linear hover:opacity-100 active:opacity-100 ${
                  option === 3 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setOption(3)}
              >
                Forgot password?
              </li>
            </ul>
            {option === 1 && <LoginForm />}
            {option === 2 && (
              <SignUpForm onSignupSuccess={handleSignupSuccess} />
            )}
            {option === 3 && <ResetPasswordForm />}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LoginPage;
