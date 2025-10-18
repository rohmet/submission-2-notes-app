const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  // Optimasi build production (misal: Babel, MiniCssExtract)
  // akan ditambahkan di sini nanti.
});
