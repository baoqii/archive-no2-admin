import { useParams } from "react-router-dom"; // Import useParams to get the post ID
import { useEffect, useState, useContext, useRef } from "react";
import Loader from "../../components/Loader";
import getTags from "../../api/getTags";
import ErrorMessage from "../../components/Error/ErrorMessage";
import updatePost from "../../api/updatePost";
import { AuthContext } from "../../contexts/AuthContext";
import { decode } from "html-entities";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import getPostDetail from "../../api/getPostDetail";
import { useForm, FormProvider, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { Tag, Type } from "react-feather";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Variants } from "../../util/AnimationVariables";

const EditPostPage = () => {
  const [isConfirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const methods = useForm();
  const navigate = useNavigate();
  const { post_id } = useParams(); // Get the post ID from the URL
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [postData, setPostData] = useState(null); // State to hold post data
  const ref = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    getPostDetail(post_id, setPostData, setError, setLoading);
  }, [post_id]);

  useEffect(() => {
    getTags(setTags, setLoading, setError);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const tagOptions = tags?.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  const filterTags = (inputValue) => {
    return tagOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterTags(inputValue));
      }, 1000);
    });

  const { handleUpdatePost } = updatePost(); // Update the import and function name

  const onSubmit = async (data) => {
    const isSuccess = await handleUpdatePost(post_id, data, token); // Pass the postId and token
    if (isSuccess) {
      navigate(-1, { replace: true });
    }
  };

  const handleCancelClick = () => {
    if (ref.current) {
      // Get the TinyMCE editor instance
      const editor = ref.current.editor;

      // Check if the editor exists and its content is empty or only contains whitespace
      const isEditorEmpty = !editor || editor.getContent().trim() === "";

      if (!isEditorEmpty) {
        // The editor contains content
        setConfirmationDialogVisible(true);
        return; // Don't perform navigation here
      }
    }

    // Check if either title or content fields have a value
    const { title, content } = methods.getValues();
    if (title || content) {
      // If either field has a value, show the confirmation dialog
      setConfirmationDialogVisible(true);
    } else {
      // If neither field has a value, navigate back
      navigate(-1, { replace: true });
    }
  };

  const svgBottom = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260"><path fill="#9ba5cb" fill-opacity="0.4" d="M0,224L10,218.7C20,213,40,203,60,202.7C80,203,100,213,120,208C140,203,160,181,180,160C200,139,220,117,240,133.3C260,149,280,203,300,218.7C320,235,340,213,360,181.3C380,149,400,107,420,122.7C440,139,460,213,480,250.7C500,288,520,288,540,277.3C560,267,580,245,600,250.7C620,256,640,288,660,298.7C680,309,700,299,720,288C740,277,760,267,780,224C800,181,820,107,840,90.7C860,75,880,117,900,122.7C920,128,940,96,960,122.7C980,149,1000,235,1020,266.7C1040,299,1060,277,1080,272C1100,267,1120,277,1140,245.3C1160,213,1180,139,1200,117.3C1220,96,1240,128,1260,138.7C1280,149,1300,139,1320,128C1340,117,1360,107,1380,101.3C1400,96,1420,96,1430,96L1440,96L1440,320L1430,320C1420,320,1400,320,1380,320C1360,320,1340,320,1320,320C1300,320,1280,320,1260,320C1240,320,1220,320,1200,320C1180,320,1160,320,1140,320C1120,320,1100,320,1080,320C1060,320,1040,320,1020,320C1000,320,980,320,960,320C940,320,920,320,900,320C880,320,860,320,840,320C820,320,800,320,780,320C760,320,740,320,720,320C700,320,680,320,660,320C640,320,620,320,600,320C580,320,560,320,540,320C520,320,500,320,480,320C460,320,440,320,420,320C400,320,380,320,360,320C340,320,320,320,300,320C280,320,260,320,240,320C220,320,200,320,180,320C160,320,140,320,120,320C100,320,80,320,60,320C40,320,20,320,10,320L0,320Z"></path></svg> 
  `;

  if (postData && tags) {
    return (
      <motion.section
        initial="initial"
        animate="in"
        exit="out"
        variants={Variants}
        className="post-container relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-start shadow-sm bg-white dark:bg-eerie-black-950 p-9 rounded-2xl lg:w-[700px] min-h-[1280px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              svgBottom
            )}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="ml-6 mt-2 text-mine-shaft-950 dark:text-silver-400 mb-6 transition-all duration-300 text-3xl tracking-wider leading-5 font-lato font-semibold italic">
            Edit post
          </h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col mt-5"
            >
              {/* Title Field */}
              <div
                className="form-fields flex flex-col transition-all duration-400 ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
         lg:w-[620px] mx-auto"
              >
                <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex justify-center items-center px-4 pointer-events-none text-rock-blue-500">
                      <Type size={20} strokeWidth={3} />
                    </div>
                    <Controller
                      name="title"
                      control={methods.control}
                      rules={{ required: "Title is required" }}
                      defaultValue={postData?.title} // Set the default value from post data
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            autoComplete="off"
                            {...field}
                            className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                          />
                        </>
                      )}
                    />
                  </div>
                  {methods.formState.errors.title && (
                    <p className="error-msg mt-3 text-red-400">
                      {methods.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                  <Controller
                    name="content"
                    control={methods.control}
                    rules={{ required: "Content is required" }}
                    defaultValue={decode(postData?.content)} // Set the default value from post data
                    render={({ field }) => (
                      <>
                        <Editor
                          apiKey={import.meta.env.TINYMCE_KEY}
                          ref={ref}
                          init={{
                            height: 500,
                            menubar: true,
                            plugins:
                              "wordcount emoticons code pagebreak preview searchreplace table typography fullscreen",

                            toolbar:
                              "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount",
                            skin: isDarkMode ? "oxide-dark" : "oxide",
                            content_css: isDarkMode ? "dark" : "default",
                            content_style: `@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'); 
                            @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap'); 
                            body { font-family: 'Karla'; background: #f9fafb, opacity: 0.5; } 
                            h1,h2,h3,h4,h5,h6 { font-family: 'Lato'; }`,
                            font_formats:
                              "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Lato Black=lato; Karla=karla; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                          }}
                          onEditorChange={field.onChange}
                          initialValue={decode(postData?.content)}
                          value={decode(field.value)}
                        />
                      </>
                    )}
                  />
                  {methods.formState.errors.content && (
                    <p className="error-msg mt-3 text-red-400">
                      {methods.formState.errors.content.message}
                    </p>
                  )}
                </div>

                <div className="form-control border-0 mb-2.5 p-[15px] text-lg text-start font-semibold text-dove-gray-500 rounded-md">
                  <Controller
                    name="tags"
                    control={methods.control}
                    // defaultValue={postData.tags.map((tag) =>
                    //   tagOptions.find((tagOption) => tagOption.value === tag._id)
                    // )}
                    defaultValue={postData?.tags?.map((tag) => tag._id) || []}
                    render={({ field }) => {
                      const selectedOptions = tagOptions.filter((option) =>
                        field.value.includes(option.value)
                      );

                      return (
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={promiseOptions}
                          isMulti
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: {
                              ...theme.colors,
                              primary25: "#d8e0ed",
                              primary: "#9ba5cb",
                            },
                          })}
                          styles={{
                            input: (base) => ({
                              ...base,
                              color: isDarkMode ? "#c0c0c0" : "#707070",
                            }),
                            menuList: (base) => ({
                              ...base,
                              background: isDarkMode
                                ? "#1f1f1f"
                                : base.background,
                            }),
                            control: (base) => ({
                              ...base,
                              background: isDarkMode
                                ? "#1f1f1f"
                                : base.background,
                            }),
                            option: (styles) => ({
                              ...styles,
                              backgroundColor: isDarkMode
                                ? "#1f1f1f"
                                : styles.backgroundColor,
                              ":active": {
                                ...styles[":active"],
                                backgroundColor: "#d8e0ed",
                              },
                              ":hover": {
                                ...styles[":hover"],
                                backgroundColor: isDarkMode
                                  ? "#d8e0ed"
                                  : styles.backgroundColor,
                              },
                            }),
                            multiValue: (styles) => {
                              return {
                                ...styles,
                              };
                            },
                            multiValueLabel: (styles) => ({
                              ...styles,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              color: isDarkMode ? "#c0cce1" : "#656a9d", // lable text color
                              background: isDarkMode ? "#484d67" : "#d8e0ed", // lable bg behined selected
                            }),
                            multiValueRemove: (styles) => ({
                              ...styles,
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              color: isDarkMode ? "#c0cce1" : "#656a9d",
                              background: isDarkMode ? "#484d67" : "#d8e0ed",
                              ":hover": {
                                color: isDarkMode ? "white" : "#a6b2d3", // on hover x icon color
                              },
                            }),
                          }}
                          placeholder={
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none text-rock-blue-500">
                                <Tag size={20} strokeWidth={3} />
                              </div>
                              <span className="text-gray-500 text-opacity-80 w-full h-12 pl-8 pr-3">
                                Select tags
                              </span>
                            </div>
                          }
                          value={selectedOptions}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
                              (option) => option.value
                            );
                            field.onChange(selectedValues);
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="form-control text-start border-0 mb-2.5 p-[15px] text-lg font-semibold text-dove-gray-500 rounded-md">
                  <label className="flex justify-start items-center">
                    <Controller
                      name="isPublished"
                      control={methods.control}
                      defaultValue={postData?.isPublished} // Set the default value from post data
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="isPublished"
                          className="mr-4 ml-1.5 leading-tight border-alto-200 rounded-2xl bg-opacity-70 h-5 w-5 cursor-pointer"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                    Post now
                  </label>
                </div>
                <div className="text-center md:text-right mt-4 md:flex md:justify-between mx-4">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="block w-full md:inline-block md:w-auto px-6 py-3 md:py-2 bg-gray-200 font-semibold my-4
                md:mt-0 md:order-1
                border cursor-pointer uppercase rounded-md text-gray-500 text-lg shadow-sm transition-all duration-200 ease-linear
                hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-800 disabled:text-gray-100
                 dark:text-wild-sand-300 dark:border-[#656565] dark:bg-eerie-black-950 dark:hover:bg-[#292929] dark:active:bg-[#3D3D3D] dark:disabled:bg-[#464646] dark:disabled:text-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="block w-full md:inline-block md:w-auto px-6 py-3 md:py-2 font-semibold my-4 md:ml-2 md:mt-0 md:order-2
                    border-0 cursor-pointer uppercase rounded-md text-white text-lg bg-rock-blue-500 shadow-sm transition-all duration-200 ease-linear
                    hover:bg-rock-blue-600 active:bg-rock-blue-700 disabled:bg-rock-blue-200 disabled:text-rock-blue-700
                     dark:text-eerie-black-950 dark:bg-rock-blue-400 dark:hover:bg-rock-blue-500 dark:active:bg-rock-blue-500 dark:disabled:bg-rock-blue-800 dark:disabled:text-rock-blue-100"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
          <ConfirmationDialog
            action="update"
            type="post"
            showConfirmation={isConfirmationDialogVisible}
            onConfirm={() => navigate(-1, { replace: true })}
            onCancel={() => setConfirmationDialogVisible(false)}
          />
        </motion.div>
      </motion.section>
    );
  }
  return null;
};

export default EditPostPage;
