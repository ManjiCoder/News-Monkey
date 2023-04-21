import React, { useContext, useState } from "react";
import { TbCircleArrowUpFilled } from "react-icons/tb";
import UseContext from "../Context/UseContext";

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);
  const { isDark } = useContext(UseContext);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 700) {
      setVisible(true);
    } else if (scrolled <= 400) {
      setVisible(false);
    }
  };
  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <button
        onClick={scrollToTop}
        className={`${
          isDark
            ? "text-white bg-slate-800 hover:bg-slate-900  shadow-white"
            : "text-gray-900 bg-white  shadow-gray-900"
        } shadow-sm transition-all text-4xl lg:text-5xl cursor-pointer rounded-full z-10 fixed bottom-28 right-3`}
        style={{ display: visible ? "flex" : "none" }}
      >
        <TbCircleArrowUpFilled />
      </button>
    </div>
  );
}

export default ScrollToTopBtn;
