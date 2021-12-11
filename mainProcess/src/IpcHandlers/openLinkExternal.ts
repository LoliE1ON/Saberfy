import { IpcHandler, IpcOpenExternalLinkProps } from "../../../types";
import { shell } from "electron";

const openLinkExternal: IpcHandler<IpcOpenExternalLinkProps> = {
  name: "openLinkExternal",
  handler(event, url) {
    shell.openExternal(url).catch(console.error);
  },
};

module.exports = [openLinkExternal];
