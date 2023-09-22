import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.section
      className="relative  w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px] mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <div className="mx-auto h-[500px]">
        <h1 className="px-6 pt-4 text-9xl mb-24 mx-0 font-lato text-mine-shaft-950 dark:text-silver-400 tracking-wider leading-5 font-bold not-italic">
          404
        </h1>
        <h2 className="mb-8 px-6 text-4xl mx-0 font-lato text-mine-shaft-950 dark:text-silver-400 tracking-wide font-semibold not-italic">
          UH OH! You&#39;re lost.
        </h2>
        <p className="mb-6 px-6 mx-0 text-tundora-700 dark:text-silver-400">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/">
          <button
            className="uppercase px-6 mx-4 py-2 rounded-md text-white bg-rock-blue-500 hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
          dark:text-eerie-black-950 dark:bg-rock-blue-300 dark:hover:bg-rock-blue-200 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
          >
            Return Home
          </button>
        </Link>
      </div>
    </motion.section>
  );
};

export default NotFoundPage;
