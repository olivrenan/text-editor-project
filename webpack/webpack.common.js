const { ProgressPlugin, DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonPaths = require("./paths");
const { PORT, DATABASE, DATABASE_PASSWORD } = require("../config");

module.exports = {
  entry: {
    app: commonPaths.entryPath
  },
  resolve: {
    modules: [
      commonPaths.node_modules,
      commonPaths.sourceApp,
      commonPaths.sourceStyles
    ],
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    filename: `${commonPaths.outputJsFolder}/[name].[hash].js`,
    path: commonPaths.outputPath
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          cache: false,
          fix: false,
          emitError: true,
          emitWarning: true,
          failOnWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|woff(2)?|otf)$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: commonPaths.outputFontsFolder
          }
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        PORT: JSON.stringify(PORT),
        DATABASE: JSON.stringify(DATABASE),
        DATABASE_PASSWORD: JSON.stringify(DATABASE_PASSWORD)
      }
    }),
    new ProgressPlugin(),
    new CleanWebpackPlugin()
  ]
};
