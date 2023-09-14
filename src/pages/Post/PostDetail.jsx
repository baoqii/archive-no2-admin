import { useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error/ErrorMessage";
import getPostDetail from "../../api/getPostDetail";
import { useEffect, useState, useContext } from "react";
import CommentsSection from "./components/CommentsSection";
import parse from "html-react-parser";
import { decode } from "html-entities";
import deletePost from "../../api/deletePost";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { motion } from "framer-motion";
import IconImage from "../../assets/images/IMG_3961.jpeg";
import { Variants } from "../../util/AnimationVariables";
import { Edit, Trash2 } from "react-feather";

const PostDetail = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    const isSuccess = await handleDeletePost(post_id, token); // Pass the postId and token
    if (isSuccess) {
      navigate(-1, { replace: true });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const { handleDeletePost } = deletePost();

  useEffect(() => {
    getPostDetail(post_id, setPost, setError, setLoading);
  }, [post_id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <motion.section
      className="post-container relative w-[700px] ml-[400px]"
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
    >
      <ConfirmationDialog
        action="delete"
        type="post"
        showConfirmation={showConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {post ? (
        <motion.article
          className="posts relative shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 mt-0 mx-auto mb-[150px] rounded-2xl w-[700px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="top-info info align-flex border-b border-solid border-alto-200 dark:border-onyx-900 bg-wild-sand-50 dark:bg-mine-shaft-950 text-tundora-700 dark:text-silver-400 p-6 pr-0 flex justify-between items-center">
            <div className="info-left align-middle flex justify-between items-center leading-6 flex-shrink-0 max-w-[calc(100%-6em-3em)] whitespace-nowrap overflow-hidden">
              <img
                src={IconImage}
                className="w-8 h-8 mr-3 bg-white dark:bg-eerie-black-950 p-0.5 border border-solid border-white dark:border-eerie-black-950 rounded-full align-middle max-w-full hover:border-rock-blue-500 dark:hover:border-rock-blue-200 hover:transition-all hover:duration-500"
              />
              <div className="top-details inline-block align-middle">
                <div className="title text-xl text-mine-shaft-950 dark:text-silver-400 tracking-wider leading-5 font-lato font-bold italic">
                  {post?.author?.username}
                </div>
              </div>
            </div>
            <div className="info-controls min-w-[6em] flex-shrink-0">
              <Link
                to={`/posts/${post_id}/edit-post`}
                className="ml-3 inline-block"
              >
                <button
                  className="bg-transparent text-rock-blue-600 p-1 hover:outline-none active:outline-none focus:outline-none outline-none active:border-none focus:border-none border-none
                 py-2 hover:text-rock-blue-700 active:text-rock-blue-800 disabled:text-rock-blue-200
                 dark:text-rock-blue-300 dark:hover:text-rock-blue-200 dark:active:text-rock-blue-300 dark:disabled:text-rock-blue-100"
                >
                  <i>
                    <Edit size={22} />
                  </i>
                </button>
              </Link>
              <button
                type="button"
                onClick={confirmDelete}
                className="bg-transparent text-rock-blue-600 p-1 hover:outline-none active:outline-none focus:outline-none outline-none active:border-none focus:border-none border-none
               py-2 hover:text-rock-blue-700 active:text-rock-blue-800 disabled:text-rock-blue-200
               dark:text-rock-blue-300 dark:hover:text-rock-blue-200 dark:active:text-rock-blue-300 dark:disabled:text-rock-blue-100"
              >
                <i>
                  <Trash2 size={22} />
                </i>
              </button>
            </div>
          </div>
          <div className="main-content p-4 bg-white dark:bg-eerie-black-950">
            <h1 className="post-title px-6 pt-4 pb-0 m-0 text-3xl font-lato text-mine-shaft-950 dark:text-silver-400 tracking-wider font-bold italic hover:text-rock-blue-500 dark:hover:rock-blue-200">
              {post?.title}
            </h1>
            <div className="content my-6 px-6 text-mine-shaft-950 dark:text-silver-400 tracking-wider font-karla">
              {parse(decode(post?.content))}
            </div>
          </div>

          <div className="info bottom-info border-t border-solid border-alto-200 dark:border-onyx-900 bg-wild-sand-50 dark:bg-mine-shaft-950 text-tundora-700 dark:text-silver-400 p-6">
            <div className="align-flex upper flex justify-start items-center text-sm uppercase tracking-widest font-karla">
              <span className="info-left">{post?.timestamp_formatted}</span>
            </div>
            <div className="tags bg-wild-sand-50 dark:bg-mine-shaft-950">
              {post?.tags.map((tag) => (
                <Link
                  to={`/tag/${tag._id}`}
                  key={tag._id}
                  className="text-tundora-700 dark:text-silver-400 font-karla text-sm hover:text-rock-blue-500 dark:hover:text-rock-blue-200 cursor-pointer after:inline-block after:w-1.5 after:h-1.5 after:bg-rock-blue-500 dark:after-bg-rock-blue-300 after:rounded-full after:mx-3 after:mb-0.5 after:align-middle last-of-type:after:hidden"
                >
                  # {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.article>
      ) : (
        <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
          No post available.
        </p>
      )}
      {post && <CommentsSection postId={post._id} />}
    </motion.section>
  );
};

export default PostDetail;
