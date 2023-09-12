import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "react-feather";
import { createPortal } from "react-dom";
import SuccessAnimation from "../Success/SuccessAnimation";

const LogoutModal = ({ isOpen, onClose, onConfirmLogout, isLoggingOut }) => {
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="logout-modal fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
              <div className="flex flex-col py-8 px-4 text-center">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <motion.div
                  className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                  initial={{
                    opacity: 0,
                    scale: 0.75,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      ease: "easeOut",
                      duration: 0.15,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    transition: {
                      ease: "easeIn",
                      duration: 0.15,
                    },
                  }}
                >
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div
                    className="inline-block align-bottom bg-white dark:bg-eerie-black-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white dark:bg-eerie-black-950 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        {isLoggingOut ? (
                          <div className="flex flex-col items-center text-center justify-center my-8">
                            <SuccessAnimation />
                            <h2 className="mt-4 dark:text-silver-400 not-italic text-lg">
                              You have successfully logged out.
                            </h2>
                            <h3 className="mt-2 dark:text-silver-400 not-italic text-lg">
                              Redirecting you to Login..
                            </h3>
                          </div>
                        ) : (
                          <>
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-[#411010] sm:mx-0 sm:h-10 sm:w-10">
                              <LogOut
                                size={24}
                                className="h-6 w-6 text-red-600 dark:text-[#e69999]"
                              />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3 className="text-xl leading-6 font-semibold font-lato not-italic text-gray-900 dark:text-silver-400 modal-headline">
                                Log out
                              </h3>
                              <div className="mt-2">
                                <p className="mt-2 text-base text-dove-gray-700 dark:text-dove-gray-300">
                                  Are you sure you want to log out?
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {isLoggingOut ? null : (
                      <div className="bg-gray-50 dark:bg-eerie-black-950 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          onClick={onConfirmLogout}
                          disabled={isLoggingOut}
                          tabIndex={0}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-200 dark:text-red-900 text-sm font-medium text-white hover:bg-red-700 dark:hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto"
                        >
                          Yes, Log Me Out
                        </button>
                        <button
                          onClick={onClose}
                          disabled={isLoggingOut}
                          tabIndex={0}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-eerie-black-950 text-sm font-medium text-gray-700 dark:text-wild-sand-300 hover:bg-gray-50 dark:hover:bg-[#292929] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-silver-500 sm:mt-0 sm:ml-3 sm:w-auto"
                        >
                          No, Go Back
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.getElementById("root")
      )}
    </>
  );
};

export default LogoutModal;
