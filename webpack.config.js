const P = require("path");
const FS = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin,
} = require("clean-webpack-plugin");

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
  devtool: "inline-source-map",
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
          "style-loader",
          // MiniCssExtractPlugin.loader,
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
