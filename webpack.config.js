// webpack.config.js
import path from "node:path";
import { createRequire } from "node:module";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { supportedLocales } from "./dates.config.js";

const require = createRequire(import.meta.url);

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  resolve: {
    alias: {
      "date-fns-locale": path.dirname(require.resolve("date-fns/package.json")),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new webpack.ContextReplacementPlugin(
      /date-fns[/\\]locale/,
      new RegExp(`(${supportedLocales.join("|")})\.js$`),
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
