import { useState } from "react";
import { X } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";

const CreateTagModal = ({ isOpen, onClose, onCreateTag }) => {
  const [name, setTagName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTag(name);
    setTagName("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-h-screen ">
            <div className=" fixed flex flex-col inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75 "> </div>
              <motion.div
                className="flex min-h-screen"
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
                    duration: 0.3,
                  },
                }}
              >
                <div className="modal-overlay text-left overflow-hidden w-11/12 max-w-2xl m-auto rounded-lg border bg-white dark:bg-eerie-black-950 border-alto-200 dark:border-onyx-900 shadow-xl transition-all transform">
                  <div className="flex justify-between p-6 border-b border-alto-200 dark:border-onyx-900 rounded-tl-lg rounded-tr-lg">
                    <h2 className="font-lato font-bold text-xl tracking-wide not-italic  text-tundora-700 dark:text-silver-400">
                      Create a tag
                    </h2>
                    <button
                      onClick={onClose}
                      className="bg-transparent cursor-pointer font-semibold font-lato text-dove-gray-700 dark:text-dove-gray-300 hover:text-dove-gray-700 dark:hover:text-dove-gray-200 active:text-dove-gray-700 dark:active:text-dove-gray-300 disabled:text-dove-gray-700 dark:disabled-dove-gray-300"
                    >
                      <X size={24}></X>
                    </button>
                  </div>
                  <form
                    className="comment-form shadow-lg transition duration-300 ease-in-out transform "
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col px-6 py-5 bg-wild-sand-50 dark:bg-mine-shaft-950">
                      <div className="w-full">
                        <div className="flex gap-1.5">
                          <p className="mb-2 font-semibold font-lato pl-3 text-tundora-700 dark:text-silver-400">
                            Name
                          </p>
                          <span className="text-red-500">*</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter tag name"
                          autoComplete="off"
                          className="w-full px-5 py-3 bg-white dark:bg-eerie-black-950 border border-alto-200 dark:border-onyx-900 rounded shadow-s appearance-none focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1"
                          value={name}
                          onChange={(e) => setTagName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-5 flex items-center justify-end gap-4 bg-white dark:bg-eerie-black-950 border-t border-alto-200 dark:border-onyx-900 rounded-bl-lg rounded-br-lg">
                      <button
                        type="submit"
                        className="px-4 py-2 text-white font-semibold font-lato border border-rock-blue-500 bg-rock-blue-500 rounded hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
          dark:text-eerie-black-950 dark:bg-rock-blue-400 dark:hover:bg-rock-blue-300 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateTagModal;
