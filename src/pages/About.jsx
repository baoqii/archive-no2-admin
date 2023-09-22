import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Mail, GitHub, Instagram } from "react-feather";
import { Variants } from "../util/AnimationVariables";

const About = () => {
  return (
    <motion.section
      className="post-container relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
    >
      <motion.div
        className="about relative shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 mt-0 p-10 mx-auto mb-5 rounded-2xl lg:w-[700px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-mine-shaft-950 dark:text-silver-400 mb-6 transition-all duration-300 text-3xl tracking-wider leading-5 font-lato font-semibold italic">
          About the blogger
        </h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
          <strong> incididunt ut labore et dolore magna aliqua. </strong>In est
          ante in nibh mauris cursus. Libero id faucibus nisl tincidunt. A erat
          nam at lectus urna. Tellus id interdum velit laoreet id donec
          ultrices. Ut ornare lectus sit{" "}
          <u className="underline-offset-4 decoration-rock-blue-500 dark:decoration-rock-blue-200">
            amet est placerat
          </u>{" "}
          in egestas erat. Mus mauris vitae ultricies leo integer malesuada nunc
          vel. Vitae semper quis lectus nulla at.{" "}
          <em>Tempus quam pellentesquev </em> nec nam aliquam sem et. Vestibulum
          lorem sed risus ultricies tristique. Quam lacus suspendisse faucibus
          interdum posuere lorem ipsum dolor.
        </p>
        <p>
          Vitae tortor condimentum lacinia quis vel eros donec ac odio. Dictumst
          quisque sagittis purus sit amet volutpat consequat mauris. Viverra
          ipsum nunc aliquet bibendum enim facilisis. Aliquam faucibus purus in
          massa tempor. At erat pellentesque adipiscing commodo elit at
          imperdiet. Ridiculus mus mauris vitae ultricies leo integer malesuada
          nunc vel.
        </p>
      </motion.div>
      <motion.div
        className="wrapper flex flex-col lg:flex-row justify-between gap-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="likedislike w-full lg:w-1/2 shadow-sm bg-white dark:bg-eerie-black-950 p-10 mx-auto rounded-2xl">
          <h1 className="text-mine-shaft-950 dark:text-silver-400 mb-6 transition-all duration-300 text-3xl tracking-wider leading-5 font-lato font-semibold italic">
            Likes & Dislikes
          </h1>
          <div className="icon-wrapper uppercase tracking-widest text-base">
            <div className="mt-4 flex items-center gap-4 align-top">
              <ThumbsUp
                size={24}
                color="#9ba5cb"
                className="flex-shrink-0 align-middle"
              />
              <ul className="flex-wrap">
                <li className="inline mr-2">theme parks,</li>
                <li className="inline mr-2">Learning new things,</li>
                <li className="inline mr-2">sushi.</li>
              </ul>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <ThumbsDown size={24} color="#9ba5cb" className="flex-shrink-0" />
              <ul className="flex-wrap">
                <li className="inline mr-2">goodbyes,</li>
                <li className="inline mr-2">horror,</li>
                <li className="inline mr-2">bugs.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="contact w-full lg:w-1/2 shadow-sm bg-white dark:bg-eerie-black-950 p-10 mx-auto rounded-2xl">
          <h1 className="text-mine-shaft-950 dark:text-silver-400 mb-6 transition-all duration-300 text-3xl tracking-wider leading-5 font-lato font-semibold italic">
            Contact
          </h1>
          <div className="icon-wrapper uppercase tracking-widest text-base">
            <div className="mt-4 flex items-center gap-4">
              <Mail size={24} color="#9ba5cb" className="flex-shrink-0" />
              <p>user@email.com</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <GitHub size={24} color="#9ba5cb" className="flex-shrink-0" />
              <p>@username</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Instagram size={24} color="#9ba5cb" className="flex-shrink-0" />
              <p>@username</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
