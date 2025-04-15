import React, { useMemo } from "react";
import { createPortal } from "react-dom";

export default ({ children, clearChildren = true }) => {
  const container = useMemo(() => document.getElementById("portal"), []);
  const childrenToDelete = useMemo(() => [].slice.call(container?.children || []), []);

  useMemo(() => {
    // delete elements before render
    if (clearChildren) {
      childrenToDelete.forEach((child) => {
        container.removeChild(child);
      });
    }
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
};
