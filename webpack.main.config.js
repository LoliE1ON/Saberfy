const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/index.ts",
	module: {
		rules: require("./webpack.rules"),
	},
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
		preferRelative: true,
		plugins: [new TsconfigPathsPlugin()],
	},
};
