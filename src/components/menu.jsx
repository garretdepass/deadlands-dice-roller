import React, { useEffect, useRef } from "react";
import "./menu.css";
import { use } from "react";

const Menu = ({ children, menuRef, setIsMenuVisible }) => {
  const wrapperRef = useRef(null);

  const useClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      };
      // Bind
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // dispose
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };

  useClickOutside(wrapperRef, () => {
    setIsMenuVisible(false);
  });

  return (
    <div className="menu" ref={wrapperRef}>
      {children}
    </div>
  );
};

export default Menu;
