const path = require("path");

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
		alias: {
			"electron/utils": path.resolve(__dirname, "src/electron/utils"),
			"types/ipc": path.resolve(__dirname, "src/types/ipc"),
		},
		preferRelative: true,
	},
};
