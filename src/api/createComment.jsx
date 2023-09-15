import { toast } from "react-toastify";

const createComment = async ({ post_id, author, text }) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const loadingToastId = toast.loading("Posting comment...");

    const response = await fetch(
      `${baseURL}/api/posts/${post_id}/new-comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, text }),
      }
    );

    if (!response.ok) {
      console.error(
        `Server returned ${response.status} ${response.statusText}`
      );
      toast.dismiss(loadingToastId);
      toast.error("Failed to create comment");
      return { success: false, message: "Failed to create comment" };
    }

    const responseData = await response.json();
    toast.dismiss(loadingToastId);
    toast.success("Comment posted successfully");
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error submitting comment:", error);
    toast.error("An error occurred");

    return {
      success: false,
      message: "An error occurred while submitting the comment",
    };
  }
};

export default createComment;
