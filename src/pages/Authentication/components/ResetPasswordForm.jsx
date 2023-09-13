import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign } from "react-feather";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <form onSubmit={handleSubmit()} className="flex flex-col mt-7">
          <div
            className="form-fields flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
            max-h-[400px] w-[450px] mx-auto"
          >
            <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-rock-blue-500">
                  <AtSign size={20} strokeWidth={3} />
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  placeholder="Email"
                  autoComplete="off"
                  className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                />
              </div>
              {errors.email && (
                <p className="errorMsg mt-3 text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control border-0 mb-2.5 p-3 font-semibold text-lg text-dove-gray-500 rounded-md">
              <button
                type="submit"
                disabled={true}
                className="border-0 w-full cursor-pointer py-[15px] px-0 uppercase rounded-md text-white text-base bg-rock-blue-500 shadow-sm transition-all duration-200 ease-linear
            hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
             dark:text-eerie-black-950 dark:bg-rock-blue-300 dark:hover:bg-rock-blue-200 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
              >
                Reset password
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
