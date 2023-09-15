import { toast } from "react-toastify";

const createTag = ({ setUpdateTagPage }) => {
  const handleCreateTag = async (tagName, token) => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;

      // Display a loading toast
      const loadingToastId = toast.loading("Creating tag...");

      const response = await fetch(`${baseURL}/api/tag/new-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: tagName }),
      });

      if (!response.ok) {
        console.error(
          `Server returned ${response.status} ${response.statusText}`
        );
        toast.dismiss(loadingToastId);
        toast.error("Failed to create tag");
        return false;
      }

      await response.json();
      setUpdateTagPage(true);

      // Dismiss the loading toast when the operation is successful
      toast.dismiss(loadingToastId);

      // Display a success toast
      toast.success("Tag created successfully");

      return true;
    } catch (error) {
      console.error("An error occurred:", error);

      // Display an error toast
      toast.error("An error occurred");

      return false;
    }
  };

  return { handleCreateTag };
};

export default createTag;
