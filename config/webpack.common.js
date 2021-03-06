const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "../theme.less"), "utf8"),
);

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'/public/iconfont/iconfont'";

const commonConfig = {
  // absolute path for project root
  context: path.resolve(__dirname, "../src"),

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    // 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，
    // output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
    // publicPath: path.resolve(__dirname, "../dist", "/")
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],

  // externals: Object.keys(externals || {})
};

module.exports = commonConfig;
