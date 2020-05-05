const path = require("path");

module.exports = {
  entryPath: path.resolve(__dirname, "../", "src/app/index.jsx"),
  node_modules: path.resolve(__dirname, "../", "node_modules"),
  outputCssFolder: "css",
  outputFontsFolder: "fonts",
  outputJsFolder: "js",
  outputPath: path.resolve(__dirname, "../", "public"),
  root: path.resolve(__dirname, "../"),
  sourceApp: path.resolve(__dirname, "../", "src/app"),
  sourceStyles: path.resolve(__dirname, "../", "src/styles"),
  templatePath: path.resolve(__dirname, "../", "src/index.html")
};
