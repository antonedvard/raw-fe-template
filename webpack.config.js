const P = require("path");
const FS = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin,
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const viewsFolder = P.resolve(__dirname, "src", "views");

const views = FS.readdirSync(viewsFolder)
  .filter(f => {
    return f.match(/(?:\.html$)/);
  })
  .map(f => {
    return new HtmlWebpackPlugin({
      template: P.resolve(viewsFolder, f),
      filename: `view/${f}`,
      scriptLoading: "defer",
    });
  });

const webpackOpts = {
  entry: { main: "./src/js/main.js" },
  output: {
    filename: "js/[name].js",
    path: P.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  mode: process.env.NODE_ENV,
  devtool:
    process.env.NODE_ENV === "development"
      ? "eval-cheap-module-source-map"
      : false,
  devServer: {
    contentBase: "./dist",
    hot: true,
    writeToDisk: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: "ts-loader",
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentWidth: 4,
                outputStyle: "compressed",
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // extensions: [".tsx", ".ts", ".js"],
    alias: {
      // Utilities: path.resolve(__dirname, "src/utilities/"),
      // Templates: path.resolve(__dirname, "src/templates/"),
    },
    modules: [P.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
          globOptions: {
            dot: false,
            gitignore: false,
            ignore: [".gitignore"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: P.resolve(__dirname, "src", "index.html"),
      scriptLoading: "defer",
    }),
    ...views,
  ],
  stats: "minimal",
};

module.exports = webpackOpts;
