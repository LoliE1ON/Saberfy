import * as path from "path";

export const instBot = {
  repo: { owner: "d0kur0", name: "instBot" },
  revisionFilePath: path.join(process.cwd(), ".update-revision"),
  rootDir: path.join(process.cwd(), ".instbot"),
  downloadUrl: "https://github.com/d0kur0/instbot/archive/master.zip",
  tempFilePath: path.join(process.cwd(), "instbot-bundle.zip"),
} as const;
