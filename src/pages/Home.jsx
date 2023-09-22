import Loader from "../components/Loader";
import Post from "./Post/components/Post";
import ErrorMessage from "../components/Error/ErrorMessage";
import { Fragment } from "react";
import { motion } from "framer-motion";
import usePagination from "../hooks/usePagination";

const Home = () => {
  const { posts, loading, error } = usePagination();
  const frameVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        duration: 2,
        staggerChildren: 0.5,
        ease: [0.02, 0.6, 0.01, 0.91],
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <motion.section
      className="post-container relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      variants={frameVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {posts.length === 0 ? (
        <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
          No posts available.
        </p>
      ) : (
        posts?.map((post) => {
          return (
            <Fragment key={post._id}>
              <Post
                id={post._id}
                author={post.author}
                title={post.title}
                content={post.content}
                timestamp={post.timestamp_formatted}
                tags={post.tags}
                comments={post.comments}
              />
            </Fragment>
          );
        })
      )}
    </motion.section>
  );
};

export default Home;
