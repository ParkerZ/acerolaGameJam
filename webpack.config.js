const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  devtool: "source-map",
  devServer: {
    port: 9000,
    allowedHosts: "all",
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.resolve(__dirname),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: ["index.html"],
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|bmp|wav|mp3)$/,
        type: "asset/resource",
      },
    ],
  },
};
