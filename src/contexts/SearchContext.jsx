import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import getPosts from "../api/getPosts";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getPosts("all", token, setPosts, setLoading, setError);
  }, [token]);

  const handleSearch = useCallback(
    (searchInput) => {
      const term = searchInput.trim();

      if (term === "") {
        setFilteredPosts(posts);
      } else {
        const searchText = term.toLowerCase();
        const filtered = posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(searchText) ||
            post.content.toLowerCase().includes(searchText) ||
            post.tags.some((tag) => tag.name.toLowerCase().includes(searchText))
          );
        });
        setFilteredPosts(filtered);
      }
      setSearchTerm(term);
      navigate("/search");
    },
    [posts, navigate]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, filteredPosts, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
