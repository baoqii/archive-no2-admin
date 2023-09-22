import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { decode } from "html-entities";
import IconImage from "../../../assets/images/IMG_3968.jpeg";
import { motion } from "framer-motion";

const Post = ({ id, author, title, content, timestamp, tags, comments }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: [0.02, 0.6, 0.01, 0.91],
      },
    },
  };
  return (
    <motion.article
      className="posts relative shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 mt-0 mx-auto mb-[150px] rounded-2xl w-full xl:w-[700px]"
      variants={itemVariants}
    >
      <div className="top-info info align-flex border-b border-solid border-alto-200 dark:border-onyx-900 bg-wild-sand-50 dark:bg-mine-shaft-950 text-tundora-700 dark:text-silver-400 p-6 flex justify-start items-center">
        <div className="info-left align-middle flex justify-between items-center leading-6 flex-shrink-0 max-w-[calc(100%-6em-3em)] whitespace-nowrap overflow-hidden">
          <Link
            to={`/posts/${id}`}
            className="text-tundora-700 cursor-pointer transition-all duration-300 hover:text-rock-blue-500"
          >
            <img
              src={IconImage}
              className="w-8 h-8 mr-3 bg-white dark:bg-eerie-black-950 p-0.5 border border-solid border-white dark:border-eerie-black-950 rounded-full align-middle max-w-full hover:border-rock-blue-500 dark:hover:border-rock-blue-200 hover:transition-all hover:duration-500"
            />
          </Link>
          <div className="top-details inline-block align-middle">
            <div className="title text-xl text-mine-shaft-950 dark:text-silver-400 tracking-wider font-lato font-bold italic">
              <Link to={`/posts/${id}`}>{author?.username}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content p-4 bg-white dark:bg-eerie-black-950">
        <h1 className="post-title px-6 pt-4 pb-0 m-0 text-3xl font-lato text-mine-shaft-950 dark:text-silver-400 tracking-wider font-bold italic">
          <Link
            to={`/posts/${id}`}
            className="hover:text-rock-blue-500 dark:hover:text-rock-blue-200"
          >
            {title}
          </Link>
        </h1>
        <div className="content my-6 px-6 text-mine-shaft-950 dark:text-silver-400 tracking-wider font-karla">
          {parse(decode(content))}
        </div>
      </div>

      <div className="info bottom-info border-t border-solid border-alto-200 dark:border-onyx-900 bg-wild-sand-50 dark:bg-mine-shaft-950 text-tundora-700 dark:text-silver-400 p-6">
        <div className="align-flex upper flex justify-between items-center text-sm uppercase tracking-widest font-karla">
          <span className="info-left">{timestamp}</span>
          <span className="info-right">
            {comments.length === 0
              ? ""
              : comments.length === 1
              ? `${comments.length} comment`
              : `${comments.length} comments`}
          </span>
        </div>
        <div className="tags bg-wild-sand-50 dark:bg-mine-shaft-950">
          {tags.map((tag) => (
            <Link
              to={`/tag/${tag._id}`}
              key={tag._id}
              className="text-tundora-700 dark:text-silver-400 font-karla text-sm hover:text-rock-blue-500 dark:hover:text-rock-blue-200 cursor-pointer after:inline-block after:w-1.5 after:h-1.5 after:bg-rock-blue-500 dark:after:bg-rock-blue-200 after:rounded-full after:mx-3 after:mb-0.5 after:align-middle last-of-type:after:hidden"
            >
              # {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default Post;
