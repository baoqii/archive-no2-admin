import Loader from "../../components/Loader";
import Post from "./components/Post";
import getPosts from "../../api/getPosts";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Unpublished = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

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

  useEffect(() => {
    getPosts("unpublished", token, setPosts, setLoading, setError);
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <motion.section
      className="post-container relative w-[700px] ml-[400px]"
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
        <div>
          <div className="p-6 text-mine-shaft-950  dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
            {posts?.length === 1
              ? `Showing ${posts?.length} unpublished post`
              : `Showing ${posts?.length} unpublished posts`}
          </div>
          {posts?.map((post) => {
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
          })}
        </div>
      )}
    </motion.section>
  );
};

export default Unpublished;
