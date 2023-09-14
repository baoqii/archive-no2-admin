import deleteComment from "../../../api/deleteComment";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { X } from "react-feather";

const Comment = ({
  postId,
  commentId,
  author,
  text,
  setUpdateCommentsSection,
}) => {
  const { token } = useContext(AuthContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    const isSuccess = await handleDeleteComment(postId, commentId, token);
    if (isSuccess) {
      setUpdateCommentsSection(true);
    }
  };

  const { handleDeleteComment } = deleteComment();

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="p-6 m-0 border-b border-solid border-alto-200 dark:border-onyx-900">
      <ConfirmationDialog
        action="delete"
        type="comment"
        showConfirmation={showConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="flex items-center justify-between mx-2">
        <span className="font-extrabold uppercase tracking-widest text-sm border-b-2 border-solid border-rock-blue-500/[.6] dark:border-rock-blue-400 text-tundora-700 dark:text-silver-400 cursor-pointer transition-all duration-300 hover:text-rock-blue-500 dark:hover:text-rock-blue-300 hover:border-rock-blue-500 dark:hover:border-rock-blue-300">
          {author}:
        </span>
        <button
          onClick={confirmDelete}
          className="bg-transparent cursor-pointer font-semibold font-lato text-dove-gray-700 dark:text-dove-gray-300 hover:text-dove-gray-700 dark:hover:text-dove-gray-200 active:text-dove-gray-700 dark:active:text-dove-gray-300 disabled:text-dove-gray-700 dark:disabled-dove-gray-300"
        >
          <X size={18}></X>
        </button>
      </div>
      <blockquote className="p-0 pl-5 border-l border-l-solid border-l-alto-200 ml-5 my-5 mr-0 uppercase tracking-widest text-sm">
        {text}
      </blockquote>
    </div>
  );
};

export default Comment;
