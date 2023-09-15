const getPostDetail = async (postId, setPost, setError, setLoading) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${baseURL}/api/posts/${postId}`);

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    setPost(data.data.post);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

export default getPostDetail;
