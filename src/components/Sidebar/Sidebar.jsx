import { NavLink, useLocation } from "react-router-dom";
import SidebarIcon from "../../assets/images/IMG_3970.jpeg";
import Searchbar from "./SearchBar";
import Theme from "../../util/Theme";
import usePagination from "../../hooks/usePagination";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { currentPage, totalPages, decrement, increment } = usePagination();
  const location = useLocation();
  const isAllowedPath =
    location.pathname === "/" || location.pathname.match(/^\/page\/\d+$/);
  const NextDisabledCondition = currentPage === totalPages || !isAllowedPath;
  const PrevDisabledCondition = currentPage === 1 || !isAllowedPath;
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar relative w-full mt-auto mx-auto mb-[150px]  xl:w-[300px] h-auto xl:fixed text-center top-[50px]">
      <div className="side-image-wrap">
        <img
          src={SidebarIcon}
          className="icon m-0 inline-block max-w-full w-24 h-24 z-[2] bg-white dark:bg-eerie-black-950 p-2.5 shadow-sm border border-solid border-white dark:border-eerie-black-950 rounded-full align-middle transition-all"
        />
      </div>

      <div className="main-sidebar bg-white dark:bg-eerie-black-950 shadow-sm -mt-10 overflow-hidden rounded-2xl">
        <div className="title-wrap p-4 pt-12 border-b border-solid border-b-alto-200">
          <div className="title text-3xl text-mine-shaft-950 dark:text-silver-400 tracking-wider leading-5 font-lato font-bold italic">
            <NavLink
              to="/"
              className="text-mine-shaft-950 dark:text-silver-400 hover:text-rock-blue-500 dark:hover:text-rock-blue-200 cursor-pointer transition-all duration-300"
            >
              Archive No.2
            </NavLink>
          </div>
          {user ? (
            <div className="blog-url uppercase inline-block text-sm tracking-widest bg-wild-sand-50 dark:bg-eerie-black-800 dark:text-silver-400 text-tundora-700 py-1 px-3 rounded-md mt-3">
              @{`${user?.username}`}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="description p-5">Description here</div>
        <Searchbar />
      </div>
      <nav className="flex flex-wrap mt-5 justify-end gap-5 items-center">
        <button
          disabled={PrevDisabledCondition}
          onClick={decrement}
          className={`text-dove-gray-500 dark:text-dove-gray-300 p-1.5 bg-white dark:bg-eerie-black-950 rounded-xl ${
            PrevDisabledCondition ? "cursor-not-allowed" : "cursor-pointer"
          } hover:bg-dove-gray-50 hover:text-dove-gray-300 dark:hover:bg-dove-gray-950 dark:hover:text-dove-gray-200 active:bg-dove-gray-100 active:text-dove-gray-400 dark:active:bg-dove-gray-900 disabled:bg-dove-gray-100 disabled:text-dove-gray-400 dark:disabled:bg-dove-gray-900 dark:disabled:text-dove-gray-200`}
          data-tooltip-id="tt-prevpg"
          data-tooltip-content={PrevDisabledCondition ? "" : "PREVIOUS PAGE"}
          data-tooltip-place="top"
          data-tooltip-variant={isDarkMode ? "light" : "dark"}
        >
          <ArrowLeft size={24} />
        </button>
        <Tooltip
          id="tt-prevpg"
          noArrow
          style={{
            borderRadius: "6px",
            letterSpacing: "0.1em",
            padding: "4px 12px",
            fontSize: "12px",
          }}
        />
        <button
          disabled={NextDisabledCondition}
          onClick={increment}
          className={`text-dove-gray-500 dark:text-dove-gray-300 p-1.5 bg-white dark:bg-eerie-black-950 rounded-xl ${
            NextDisabledCondition ? "cursor-not-allowed" : "cursor-pointer"
          } hover:bg-dove-gray-50 hover:text-dove-gray-300 dark:hover:bg-dove-gray-950 dark:hover:text-dove-gray-200 active:bg-dove-gray-100 active:text-dove-gray-400 dark:active:bg-dove-gray-900 disabled:bg-dove-gray-100 disabled:text-dove-gray-400 dark:disabled:bg-dove-gray-900 dark:disabled:text-dove-gray-200`}
          data-tooltip-id="tt-nextpg"
          data-tooltip-content={NextDisabledCondition ? "" : "NEXT PAGE"}
          data-tooltip-place="top"
          data-tooltip-variant={isDarkMode ? "light" : "dark"}
        >
          <ArrowRight />
        </button>
        <Tooltip
          id="tt-nextpg"
          noArrow
          style={{
            borderRadius: "6px",
            letterSpacing: "0.1em",
            padding: "4px 12px",
            fontSize: "12px",
          }}
        />
      </nav>

      <Theme isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </aside>
  );
};

export default Sidebar;
