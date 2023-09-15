import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Home from "../../pages/Home";
import Layout from "../../pages/Layout";
import LoginPage from "../../pages/Authentication/LoginSignUpPage";
import TagPage from "../../pages/Tag/TagPage";
import PostDetail from "../../pages/Post/PostDetail";
import AddPostPage from "../../pages/Post/AddPostPage";
import Unpublished from "../../pages/Post/Unpublished";
import EditPostPage from "../../pages/Post/EditPostPage";
import PostsWithinATag from "../../pages/Post/PostsWithinATag";
import About from "../../pages/About";
import Newsletter from "../../pages/Newsletter";
import FilteredPosts from "../../pages/Post/FilteredPosts";
import NotFoundPage from "../../pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "./ProtectedRoute";

const RoutesComponent = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {token ? (
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/page/:currentPage" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/tags" element={<TagPage />} />
              <Route path="/tag/:tag_id" element={<PostsWithinATag />} />
              <Route path="/posts/:post_id" element={<PostDetail />} />
              <Route path="/posts/unpublished" element={<Unpublished />} />
              <Route path="/new-post" element={<AddPostPage />} />
              <Route
                path="/posts/:post_id/edit-post"
                element={<EditPostPage />}
              />
              <Route path="/search" element={<FilteredPosts />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        )}
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesComponent;
