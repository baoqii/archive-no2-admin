import { toast } from "react-toastify";

const deleteTag = ({ setUpdateTagPage }) => {
  const handleDeleteTag = async (tagId, token) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const loadingToastId = toast.loading("Deleting tag...");

      const response = await fetch(`${baseURL}/api/tag/${tagId}`, {
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
        toast.error("Failed to delete tag");
        return false;
      }

      setUpdateTagPage(true);

      toast.dismiss(loadingToastId);
      toast.success("Tag deleted successfully");

      return true;
    } catch (error) {
      console.error("An error occurred:", error);

      toast.error("An error occurred");

      return false;
    }
  };
  return { handleDeleteTag };
};

export default deleteTag;
