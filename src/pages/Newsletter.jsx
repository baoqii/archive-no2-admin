import { motion } from "framer-motion";
import { ArrowRight, Mail } from "react-feather";
import { Link } from "react-router-dom";
import { Variants } from "../util/AnimationVariables";

const Newsletter = () => {
  return (
    <motion.section
      className="post-container relative  w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
    >
      <motion.div
        className="relative text-center shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 p-10 rounded-2xl lg:w-[700px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="wrapper flex flex-col justify-center items-center h-[600px]">
          <Mail size={100} color="#9ba5cb" className="mt-0 mb-4 mx-auto" />
          <h1 className="text-mine-shaft-950 dark:text-silver-400 mb-2 transition-all duration-300 text-2xl tracking-wider leading-5 font-lato font-bold not-italic">
            Newsletter
          </h1>
          <p className="mt-1 mx-auto text-xl">No spam, I promise.</p>
          <div className="w-full flex justify-center">
            <div className="mt-4 w-2/3">
              <form className="relative w-full">
                <div className="flex flex-nowrap flex-start">
                  <div className="flex-grow">
                    <input
                      type="email"
                      name="email"
                      placeholder="Type your email..."
                      className="bg-[#eee] dark:bg-[#2b2b2b] text-dove-gray-500 dark:text-silver-400 inline-block p-2.5 h-10 border border-solid border-rock-blue-500 border-r-0 rounded-l-md text-base w-full"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 mt-0 h-10 py-0 px-5 cursor-pointer inline-block bg-rock-blue-500 hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700 
                   dark:bg-rock-blue-300 dark:hover:bg-rock-blue-200 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100
                  border border-solid border-rock-blue-500 rounded-r-md font-semibold text-sm text-center opacity-100 outline-0 whitespace-nowrap"
                  >
                    <span className="text-white dark:text-eerie-black-950">
                      Subscribe
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link to="/" className="text-tundora-700 dark:text-silver-400">
            <button className="flex items-center justify-center mt-2.5 mx-auto mb-0 bg-transparent text-sm font-semibold cursor-pointer h-10 rounded-md text-center py-2.5 px-5 opacity-100 outline-0 whitespace-nowrap">
              No thanks
              <ArrowRight
                size={20}
                color="#9ba5cb"
                strokeWidth="3px"
                className="align-middle ml-2 h-[18px]"
              />
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Newsletter;
