const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  devtool: false,
  mode: "production",
  entry: "/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  // cache: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico|ttf|eot|woff)$/,
        exclude: /node_modules/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
    fallback: { assert: require.resolve("assert") },
  },
  devServer: {
    port: 3000,
    // contentBase: path.join(__dirname, 'public'),
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: "Hot Module Replacement",
      template: "/public/index.html",
      favicon: "./public/favicon.png",
    }),
    new CompressionPlugin(),
    new LodashModuleReplacementPlugin(),
  ],
  optimization: {
    minimize: true,
    usedExports: true, // <- no remove unused function
  },
};
