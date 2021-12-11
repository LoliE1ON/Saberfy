import React from "react";
const { ipcRenderer } = window.require("electron");

export const openLinkExternal = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  ipcRenderer.invoke("openLinkExternal", event.currentTarget.href);
};
