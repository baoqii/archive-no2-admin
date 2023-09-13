import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import SideMenu from "../components/SideMenu/SideMenu";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Footer } from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Layout = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <main className="container relative mx-auto mt-[50px] mb-4 w-[calc(300px+700px+100px)]">
        <Sidebar />
        <SideMenu />
        <ScrollToTopButton />
        <Outlet />
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme={isDarkMode ? "dark" : "light"}
        />
      </main>
    </>
  );
};

export default Layout;
