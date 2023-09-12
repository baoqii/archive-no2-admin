import { useState, useEffect, Fragment, useContext } from "react";
import { ArrowUp } from "react-feather";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../contexts/ThemeContext";

const ScrollToTopButton = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  const [tooltipVariant, setTooltipVariant] = useState(
    isDarkMode ? "light" : "dark"
  );

  useEffect(() => {
    setTooltipVariant(isDarkMode ? "light" : "dark");
  }, [isDarkMode]);

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Fragment>
          <button
            className="scroll-to-top-button fixed bottom-5 right-5 cursor-pointer p-1 rounded-lg bg-transparent text-rock-blue-500 dark:text-rock-blue-200 hover:text-tundora-700 dark:hover:text-silver-400 active:text-tundora-700 dark:active:text-silver-400"
            onClick={scrollToTop}
            data-tooltip-id="tt-scrolltop"
            data-tooltip-content="BACK TO TOP"
            data-tooltip-place="top"
            data-tooltip-variant={tooltipVariant}
          >
            <ArrowUp size={24} />
          </button>
          <Tooltip
            id="tt-scrolltop"
            noArrow
            style={{
              borderRadius: "6px",
              letterSpacing: "0.1em",
              padding: "4px 12px",
              fontSize: "12px",
            }}
          />
        </Fragment>
      )}
    </>
  );
};

export default ScrollToTopButton;
