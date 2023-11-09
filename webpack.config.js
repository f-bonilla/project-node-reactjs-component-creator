const webpack = require("webpack");
const path = require("path");
const { RawSource } = require("webpack-sources");
const TerserPlugin = require("terser-webpack-plugin");

const helpComment = `// URL: https://github.com/f-bonilla/project-node-reactjs-component-creator
// Copy this file to the root directory of your project.
// In your project folder execute the following code passing as parameter the path to the source code, e.g.:
// node build-component.min.js ./src \n`;

class AddCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "AddCommentsPlugin",
      (compilation, callback) => {
        const buildFilePath = path.resolve(
          __dirname,
          "dist/build-component.min.cjs"
        );
        const buildFileContent =
          compilation.assets["build-component.min.cjs"].source();
        const updatedContent =
          helpComment + buildFileContent.replace(/^\s+/, "");

        compilation.assets["build-component.min.cjs"] = new RawSource(
          updatedContent
        );

        callback();
      }
    );
  }
}

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "build-component.min.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  plugins: [new AddCommentsPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};
