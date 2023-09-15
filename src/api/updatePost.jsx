import { toast } from "react-toastify";

const updatePost = () => {
  const handleUpdatePost = async (post_id, data, token) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const loadingToastId = toast.loading("Updating post...");

      const response = await fetch(`${baseURL}/api/posts/${post_id}`, {
        method: "PUT",
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
        toast.error("Failed to update post");
        return false;
      }

      await response.json();
      toast.dismiss(loadingToastId);
      toast.success("Post updated successfully");
      return true;
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");

      return false;
    }
  };

  return { handleUpdatePost };
};

export default updatePost;
