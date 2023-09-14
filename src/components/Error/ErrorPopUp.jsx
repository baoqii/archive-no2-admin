import { motion, AnimatePresence } from "framer-motion";
import { X } from "react-feather";

const ErrorPopUp = ({ error, clearErrorMessage }) => {
  let errorMessage = "An error occurred. Please try again later.";

  // Check for network errors
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    errorMessage = "Network error. Please check your internet connection.";
  }

  // Check for server response errors
  if (error.message.includes("Server returned")) {
    errorMessage =
      "Failed to retrieve data from the server. Please try again later.";
  }

  if (error.message.includes("Server returned 401 Unauthorized")) {
    errorMessage = "Incorrect username or password.";
  }

  if (error.message.includes("Validation error")) {
    errorMessage =
      "An error occurred when validating the fields. Please change one of the fields and try again.";
  }

  // Check for other unexpected errors
  if (error.name === "SyntaxError" && error.message.includes("JSON")) {
    errorMessage = "Error parsing server response. Please try again later.";
  }

  return (
    <AnimatePresence>
      {errorMessage && (
        <motion.div
          positionTransition
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="error-message my-5 bg-red-100 dark:bg-[#411010] border border-red-400 text-red-700 dark:text-[#e69999] hover:text-red-900 dark:hover:text-red-200 active:text-red-800 dark:active:text-red-200 px-4 py-3 relative font-semibold tracking-wide font-lato"
        >
          <div className="mx-4">{errorMessage}</div>
          <button
            onClick={clearErrorMessage}
            className="absolute bg-transparent top-0 bottom-0 right-0 px-4 py-3"
          >
            <X size={18}></X>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorPopUp;
