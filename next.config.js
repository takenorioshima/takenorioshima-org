const withTM = require("next-transpile-modules")(["three"]);
const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages(
  withTM({
    output: "export",
    trailingSlash: true,
  })
);