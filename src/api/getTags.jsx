const getTags = async (setTags, setLoading, setError) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${baseURL}/api/tag/`);

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    setTags(data.data);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

export default getTags;
