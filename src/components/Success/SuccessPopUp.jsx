import { motion, AnimatePresence } from "framer-motion";
import { X } from "react-feather";

const SuccessPopUp = ({ message, clearSuccessMessage }) => {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          positionTransition
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="success-message my-5 bg-green-100 dark:bg-[#103e10] border border-green-400 text-green-700 dark:text-[#99e699] hover:text-green-900 dark:hover:text-green-200 active:text-green-800 dark:active:text-green-200 px-4 py-3 relative font-semibold tracking-wide font-lato"
        >
          {message}
          <button
            onClick={clearSuccessMessage}
            className="absolute bg-transparent top-0 bottom-0 right-0 px-4 py-3"
          >
            <X size={18}></X>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopUp;
