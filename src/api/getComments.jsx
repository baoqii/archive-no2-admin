const getComments = async (postId, setComments, setLoading, setError) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${baseURL}/api/posts/${postId}/comments`);

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    setComments(data.data.comment_list);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

export default getComments;
