import { toast } from "react-toastify";

const deletePost = () => {
  const handleDeletePost = async (post_id, token) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const loadingToastId = toast.loading("Deleting post...");

      const response = await fetch(`${baseURL}/api/posts/${post_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          `Server returned ${response.status} ${response.statusText}`
        );
        toast.dismiss(loadingToastId);
        toast.error("Failed to delete post");
        return false;
      }

      toast.dismiss(loadingToastId);
      toast.success("Post deleted successfully");
      return true;
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");

      return false;
    }
  };

  return { handleDeletePost };
};

export default deletePost;
