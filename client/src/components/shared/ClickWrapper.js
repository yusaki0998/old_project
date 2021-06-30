/** @format */

import React, { useRef, useEffect } from "react";

function useOutsideHandler(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function OutsideHandler(props) {
  const wrapperRef = useRef(null);

  useOutsideHandler(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
}
