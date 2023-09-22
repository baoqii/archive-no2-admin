import { useForm, FormProvider, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import AsyncSelect from "react-select/async";
import { useEffect, useState, useContext, useRef } from "react";
import Loader from "../../components/Loader";
import getTags from "../../api/getTags";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import createPost from "../../api/createPost";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Tag, Type } from "react-feather";
import { motion } from "framer-motion";
import { Variants } from "../../util/AnimationVariables";

const AddPostPage = () => {
  const methods = useForm();
  const [isConfirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

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

  const { handleCreatePost } = createPost();

  const onSubmit = async (data) => {
    const result = await handleCreatePost(data, token);
    if (result.success) {
      methods.reset();
      navigate(`/posts/${result.data.data.post.id}`, { replace: true });
    }
  };

  const handleCancelClick = () => {
    if (ref.current) {
      const editor = ref.current.editor;
      const isEditorEmpty = !editor || editor.getContent().trim() === "";

      if (!isEditorEmpty) {
        setConfirmationDialogVisible(true);
        return;
      }
    }

    const { title, content } = methods.getValues();
    if (title || content) {
      setConfirmationDialogVisible(true);
    } else {
      navigate(-1, { replace: true });
    }
  };

  const svgBottom = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#9ba5cb" fill-opacity="0.4" d="M0,256L10.4,256C20.9,256,42,256,63,266.7C83.5,277,104,299,125,288C146.1,277,167,235,188,224C208.7,213,230,235,250,218.7C271.3,203,292,149,313,117.3C333.9,85,355,75,376,96C396.5,117,417,171,438,202.7C459.1,235,480,245,501,240C521.7,235,543,213,563,202.7C584.3,192,605,192,626,202.7C647,213,668,235,689,245.3C709.6,256,730,256,751,261.3C772.2,267,793,277,814,245.3C834.8,213,856,139,877,144C897.4,149,918,235,939,261.3C960,288,981,256,1002,224C1022.6,192,1043,160,1064,133.3C1085.2,107,1106,85,1127,101.3C1147.8,117,1169,171,1190,181.3C1210.4,192,1231,160,1252,154.7C1273,149,1294,171,1315,160C1335.7,149,1357,107,1377,112C1398.3,117,1419,171,1430,197.3L1440,224L1440,320L1429.6,320C1419.1,320,1398,320,1377,320C1356.5,320,1336,320,1315,320C1293.9,320,1273,320,1252,320C1231.3,320,1210,320,1190,320C1168.7,320,1148,320,1127,320C1106.1,320,1085,320,1064,320C1043.5,320,1023,320,1002,320C980.9,320,960,320,939,320C918.3,320,897,320,877,320C855.7,320,835,320,814,320C793,320,772,320,751,320C730.4,320,710,320,689,320C667.8,320,647,320,626,320C605.2,320,584,320,563,320C542.6,320,522,320,501,320C480,320,459,320,438,320C417.4,320,397,320,376,320C354.8,320,334,320,313,320C292.2,320,271,320,250,320C229.6,320,209,320,188,320C167,320,146,320,125,320C104.3,320,83,320,63,320C41.7,320,21,320,10,320L0,320Z"></path></svg>
  `;

  return (
    <motion.section
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
      className="post-container relative w-[100dvw] md:w-[700px] ml-auto xl:ml-[400px]"
    >
      <motion.div
        className="relative text-start shadow-sm bg-white dark:bg-eerie-black-950 p-9 rounded-2xl lg:w-[700px] min-h-[1280px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            svgBottom
          )}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="ml-6 mt-2 text-mine-shaft-950 dark:text-silver-400 mb-6 transition-all duration-300 text-3xl tracking-wider leading-5 font-lato font-semibold italic">
          New post
        </h1>
        <FormProvider {...methods}>
          <form
            className="flex flex-col mt-5"
            onSubmit={(e) => {
              e.stopPropagation();

              return methods.handleSubmit(onSubmit)(e);
            }}
          >
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
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <input
                          type="text"
                          id="title"
                          placeholder="Title"
                          autoComplete="off"
                          className="placeholder-gray-500 placeholder-opacity-80 bg-white dark:text-silver-400 dark:bg-eerie-black-950 border-2 dark:border-silver-400 rounded-lg w-full focus:outline-none focus:border-rock-blue-500 focus:ring-rock-blue-500 focus:ring-1 h-12 pl-12 pr-3"
                          {...field}
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
                  defaultValue=""
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
                        value={field.value}
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
                  defaultValue={[]}
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
                            color: isDarkMode ? "#c0cce1" : "#656a9d",
                            background: isDarkMode ? "#484d67" : "#d8e0ed",
                          }),
                          multiValueRemove: (styles) => ({
                            ...styles,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            color: isDarkMode ? "#c0cce1" : "#656a9d",
                            background: isDarkMode ? "#484d67" : "#d8e0ed",
                            ":hover": {
                              color: isDarkMode ? "white" : "#a6b2d3",
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

              <div className="form-control text-start border-0 mb-2.5 p-[15px] text-lg font-semibold text-dove-gray-500 dark:text-silver-400 rounded-md">
                <label className="flex justify-start items-center">
                  <Controller
                    name="isPublished"
                    control={methods.control}
                    defaultValue={false}
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
                  Submit
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
        <ConfirmationDialog
          action="add"
          type="post"
          showConfirmation={isConfirmationDialogVisible}
          onConfirm={() => navigate(-1, { replace: true })}
          onCancel={() => setConfirmationDialogVisible(false)}
        />
      </motion.div>
    </motion.section>
  );
};

export default AddPostPage;
