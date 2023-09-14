import { Fragment, useEffect, useState } from "react";
import getPostsWithinATag from "../../api/getPostsWithinATag";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error/ErrorMessage";
import Post from "./components/Post";
import { motion } from "framer-motion";

const PostsWithinATag = () => {
  const { tag_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    getPostsWithinATag(tag_id, setPosts, setError, setLoading);
  }, [tag_id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <motion.section
      className="post-container relative w-[700px] ml-[400px] min-h-[500px]"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      variants={frameVariants}
    >
      {posts.length === 0 ? (
        <div>
          <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
            No posts available.
          </p>
        </div>
      ) : (
        <div>
          <div className="p-6 text-mine-shaft-950  dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
            {posts?.length === 1
              ? `Showing ${posts?.length} post`
              : `Showing ${posts?.length} posts`}
          </div>
          {posts?.map((post) => (
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
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default PostsWithinATag;
