import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { X, Tag as TagIcon } from "react-feather";
import ConfirmationDialog from "../../../components/ConfirmationDialog"; // Import your ConfirmationDialog component here
import deleteTag from "../../../api/deleteTag";
import { AuthContext } from "../../../contexts/AuthContext";

const Tag = ({ tag_id, name, setUpdateTagPage, isEditing = false }) => {
  const { token } = useContext(AuthContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const { handleDeleteTag } = deleteTag({ setUpdateTagPage });

  const handleConfirmDelete = async (tagId) => {
    if (token) {
      await handleDeleteTag(tagId, token);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <Link
        to={`/tag/${tag_id}`}
        className="hover:text-rock-blue-500 dark:hover:text-rock-blue-200 flex items-center space-x-4 my-3"
      >
        <TagIcon size={14}></TagIcon>
        <p>{name}</p>
      </Link>
      {isEditing && (
        <button
          onClick={confirmDelete}
          className="bg-transparent cursor-pointer font-semibold font-lato text-dove-gray-700 dark:text-dove-gray-300 hover:text-dove-gray-700 dark:hover:text-dove-gray-200 active:text-dove-gray-700 dark:active:text-dove-gray-300 disabled:text-dove-gray-700 dark:disabled-dove-gray-300"
        >
          <X size={14}></X>
        </button>
      )}
      <ConfirmationDialog
        action="delete"
        type="tag"
        showConfirmation={showConfirmation}
        onConfirm={() => handleConfirmDelete(tag_id)}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Tag;
