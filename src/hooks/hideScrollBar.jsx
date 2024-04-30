import { useEffect } from "react";

export const hideScrollBar = (showModal) => {
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [showModal]);
};
