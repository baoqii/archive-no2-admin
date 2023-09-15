import { toast } from "react-toastify";

const createPost = () => {
  const handleCreatePost = async (data, token) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const loadingToastId = toast.loading("Creating post...");

      const response = await fetch(`${baseURL}/api/posts/new-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(
          `Server returned ${response.status} ${response.statusText}`
        );
        toast.dismiss(loadingToastId);
        toast.error("Failed to create comment");
        return { success: false, message: "Failed to create post" };
      }

      const responseData = await response.json();
      toast.dismiss(loadingToastId);
      toast.success("Post created successfully");

      return { success: true, data: responseData };
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");
      return {
        success: false,
        message: "An error occurred while submitting the post",
      };
    }
  };

  return { handleCreatePost };
};

export default createPost;
