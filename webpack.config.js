const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./js/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: isProduction ? "production" : "development",
    optimization: {
      minimize: isProduction,
      minimizer: isProduction ? [new TerserPlugin()] : [],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 8080,
    },
  
  };
};
