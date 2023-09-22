import Loader from "../../components/Loader";
import getTags from "../../api/getTags";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { useEffect, useState, useContext, Fragment } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import createTag from "../../api/createTag";
import CreateTagModal from "./components/CreateTagModal";
import { Folder, Plus, Save, Settings } from "react-feather";
import { motion } from "framer-motion";
import { Variants } from "../../util/AnimationVariables";
import ErrorPopUp from "../../components/Error/ErrorPopUp";
import Tag from "./components/Tag";

const TagPage = () => {
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [updateTagPage, setUpdateTagPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getTags(setTags, setLoading, setError);
  }, []);

  useEffect(() => {
    if (updateTagPage) {
      getTags(setTags, setLoading, setError);
    }
  }, [updateTagPage]);

  useEffect(() => {
    setUpdateTagPage(false);
  }, [updateTagPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { handleCreateTag } = createTag({ setUpdateTagPage });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const onSubmitTag = async (tagName) => {
    try {
      if (token) {
        await handleCreateTag(tagName, token);
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      closeModal();
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <motion.section
      className="post-container relative  w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px] bg-white dark:bg-eerie-black-950 rounded-2xl"
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
    >
      <motion.div
        className="min-h-[600px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {tags.length === 0 ? (
          <p className="p-6 text-mine-shaft-950 dark:text-silver-400 font-lato text-2xl tracking-wider leading-5 font-bold italic">
            No tags available.
          </p>
        ) : (
          <Fragment>
            <div className="flex justify-between items-center mx-4 border-b border-b-alto-200 pt-5 py-3">
              <div className="flex gap-4 items-center">
                <Folder size={20} className="ml-3"></Folder>
                <h2 className="font-lato font-semibold text-lg tracking-wide text-tundora-700 dark:text-silver-400 leading-5 not-italic">
                  Tags
                </h2>
              </div>
              <div className="flex gap-2 mr-1 items-center">
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
                <button
                  onClick={toggleEditing}
                  className="bg-transparent text-rock-blue-600 p-1 hover:outline-none active:outline-none focus:outline-none outline-none active:border-none focus:border-none border-none
           py-2 hover:text-rock-blue-700 active:text-rock-blue-800 disabled:text-rock-blue-200
           dark:text-rock-blue-300 dark:hover:text-rock-blue-200 dark:active:text-rock-blue-300 dark:disabled:text-rock-blue-100"
                >
                  <i>
                    {isEditing ? <Save size={22} /> : <Settings size={22} />}
                  </i>
                </button>
              </div>
            </div>
            {errorMessage && (
              <ErrorPopUp
                error={errorMessage}
                clearErrorMessage={clearErrorMessage}
              />
            )}
            <CreateTagModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onCreateTag={onSubmitTag}
            />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] mx-4">
              {tags?.map((tag) => (
                <div
                  key={tag._id}
                  className="border-b border-b-alto-200 px-4 hover:bg-wild-sand-50 hover:dark:bg-mine-shaft-950"
                >
                  <Tag
                    tag_id={tag._id}
                    name={tag.name}
                    setUpdateTagPage={setUpdateTagPage}
                    isEditing={isEditing}
                  />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </motion.div>
    </motion.section>
  );
};

export default TagPage;
