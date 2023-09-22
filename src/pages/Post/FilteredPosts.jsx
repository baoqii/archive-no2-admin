import { Fragment, useContext } from "react";
import Post from "./components/Post";
import { motion } from "framer-motion";
import { SearchContext } from "../../contexts/SearchContext";

const FilteredPosts = () => {
  const { searchTerm, filteredPosts } = useContext(SearchContext);
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
  return (
    <motion.section
      className="post-container relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={frameVariants}
    >
      <div className="min-h-[500px]">
        {filteredPosts.length === 0 ? (
          <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
            {`We couldn't find a match for ${searchTerm}. Please try another search.`}
          </p>
        ) : (
          <>
            <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">{`Search results for "${searchTerm}"`}</p>
            {filteredPosts?.map((post) => {
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
          </>
        )}
      </div>
    </motion.section>
  );
};

export default FilteredPosts;
