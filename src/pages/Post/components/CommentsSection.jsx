import Loader from "../../../components/Loader";
import getComments from "../../../api/getComments";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentModal from "./CommentModal";
import { Plus } from "react-feather";
import { motion } from "framer-motion";

const CommentsSection = ({ postId }) => {
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [newComment, setNewComment] = useState([]);

  const [updateCommentsSection, setUpdateCommentsSection] = useState(false);

  useEffect(() => {
    getComments(postId, setComments, setLoading, setError);
  }, [postId]);

  useEffect(() => {
    if (updateCommentsSection) {
      getComments(postId, setComments, setLoading, setError);
    }
  }, [postId, updateCommentsSection]);

  useEffect(() => {
    setUpdateCommentsSection(false);
  }, [updateCommentsSection]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmitComment = ({ author, comment }) => {
    setNewComment([...newComment, { author, comment }]);
  };

  return (
    <motion.article
      className="post-comments relative shadow-sm overflow-hidden bg-white dark:bg-eerie-black-950 mt-0 mx-auto mb-[150px] rounded-2xl w-[700px]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="title flex justify-between items-center bg-wild-sand-50 dark:bg-mine-shaft-950 p-6 border-b border-solid border-alto-200 dark:border-onyx-900 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
        <p>
          {comments?.length === 0
            ? "No comments yet"
            : comments?.length === 1
            ? `${comments?.length} comment`
            : `${comments?.length} comments`}
        </p>
        <div>
          <button
            onClick={openModal}
            className="bg-transparent text-rock-blue-600 p-1 hover:outline-none active:outline-none focus:outline-none outline-none active:border-none focus:border-none border-none
           py-2 hover:text-rock-blue-700 active:text-rock-blue-800 disabled:text-rock-blue-200
           dark:text-rock-blue-300 dark:hover:text-rock-blue-200 dark:active:text-rock-blue-300 dark:disabled:text-rock-blue-100"
          >
            <i>
              <Plus size={22} />
            </i>
          </button>
        </div>
      </div>
      <CommentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmitComment={handleSubmitComment}
        setUpdateCommentsSection={setUpdateCommentsSection}
      ></CommentModal>
      <div>
        {comments?.map((comment) => {
          return (
            <Comment
              key={comment._id}
              postId={postId}
              commentId={comment._id}
              author={comment.author}
              text={comment.text}
              setUpdateCommentsSection={setUpdateCommentsSection}
            />
          );
        })}
      </div>
    </motion.article>
  );
};

export default CommentsSection;
