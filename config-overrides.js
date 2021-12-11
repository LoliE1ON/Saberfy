const path = require("path");
const { removeModuleScopePlugin, override, babelInclude } = require("customize-cra");

module.exports = {
  webpack: override(
    removeModuleScopePlugin(),
    babelInclude([path.resolve("./rendererProcess/src"), path.resolve("./types")])
  ),

  paths: paths => {
    paths = {
      ...paths,
      appPath: path.resolve(__dirname, "rendererProcess"),
      dotenv: path.resolve(__dirname, "rendererProcess/.env"),
      appPublic: path.resolve(__dirname, "rendererProcess/public"),
      appHtml: path.resolve(__dirname, "rendererProcess/public/index.html"),
      appIndexJs: path.resolve(__dirname, "rendererProcess/src/index.tsx"),
      appSrc: path.resolve(__dirname, "rendererProcess/src"),
      appTsConfig: path.resolve(__dirname, "rendererProcess/tsconfig.json"),
      appTypeDeclarations: path.resolve(__dirname, "rendererProcess/src/react-app-env.d.ts"),
      appBuild: path.resolve(__dirname, ".dist/rendererProcess"),
    };

    return paths;
  },
};
