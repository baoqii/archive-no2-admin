import { Frown } from "react-feather";
import { motion } from "framer-motion";

const ErrorMessage = ({ error }) => {
  let errorMessage = "An error occurred. Please try again later.";

  // Check for network errors
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    errorMessage = "Network error. Please check your internet connection.";
  }

  // Check for server response errors
  if (error.message.includes("Server returned")) {
    errorMessage = "Failed to retrieve data from the server.";
  }

  // Check for other unexpected errors
  if (error.name === "SyntaxError" && error.message.includes("JSON")) {
    errorMessage = "Error parsing server response. Please try again later.";
  }

  return (
    <motion.section
      className="relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <div className="flex flex-col justify-center items-center h-[600px] gap-2">
        <Frown size={80} color="#888"></Frown>
        <h2 className="my-4 px-6 text-4xl mx-0 font-lato text-mine-shaft-950 dark:text-silver-400 tracking-wide leading-5 font-bold not-italic">
          Something went wrong
        </h2>
        <p className="mb-3 px-6 mx-0 text-tundora-700 dark:text-silver-400 text-lg font-medium">
          {errorMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="uppercase px-6 mx-4 py-2 text-white bg-rock-blue-500 hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
          dark:text-eerie-black-950 dark:bg-rock-blue-400 dark:hover:bg-rock-blue-300 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
        >
          Retry
        </button>
        <p className="my-3 px-6 mx-0 text-tundora-700 dark:text-silver-400 text-lg font-light">
          If the problem persists, please contact support.
        </p>
      </div>
    </motion.section>
  );
};

export default ErrorMessage;
