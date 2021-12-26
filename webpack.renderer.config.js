const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

rules.push({
	test: /\.css$/,
	use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
	target: "electron-renderer",
	module: {
		rules,
	},
	plugins: plugins,
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
		preferRelative: true,
		plugins: [new TsconfigPathsPlugin()],
	},
};
