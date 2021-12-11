import * as nodeStatic from "node-static";
import * as path from "path";
import * as http from "http";

export const serveStatic = async (): Promise<void> => {
  const server = new nodeStatic.Server(path.join(__dirname, "../../../rendererProcess"));
  await new Promise<void>((resolve, reject) => {
    http
      .createServer((request, response) => {
        request.addListener("end", () => server.serve(request, response)).resume();
      })
      .listen(3000)
      .on("listening", resolve)
      .on("error", reject);
  });
};
