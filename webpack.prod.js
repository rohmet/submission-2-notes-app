// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 1. Impor plugin

module.exports = merge(common, {
  mode: "production",

  // 2. Tambahkan module rules untuk Production
  module: {
    rules: [
      // Aturan untuk JavaScript (Babel)
      {
        test: /\.js$/, // Cari semua file .js
        exclude: /node_modules/, // Kecualikan folder node_modules
        use: {
          loader: "babel-loader", // Gunakan babel-loader
          options: {
            // Konfigurasi babel-loader akan membaca dari .babelrc
            cacheDirectory: true,
          },
        },
      },
      // Aturan untuk CSS (Ekstraksi)
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 3. Ganti style-loader
      },
    ],
  },

  // 4. Tambahkan plugin untuk Production
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Format nama file CSS hasil build
    }),
  ],
});
