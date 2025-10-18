// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 1. Entry Point: File JavaScript utama aplikasi kita
  entry: "./src/app.js",

  // 2. Output: Di mana Webpack akan menyimpan file hasil "bundle"
  output: {
    path: path.resolve(__dirname, "dist"), // Folder 'dist' (distribution)
    filename: "[name].bundle.js", // Nama file JS hasil bundle
    clean: true, // Membersihkan folder 'dist' sebelum build
  },

  // 3. Mode: 'development' untuk npm run start-dev
  mode: "development",

  // 4. Modul Rules: Cara menangani file selain JS (seperti CSS)
  module: {
    rules: [
      {
        test: /\.css$/, // Mencari semua file yang berakhiran .css
        use: [
          "style-loader", // 3. Menyuntikkan style ke dalam tag <style> di DOM
          "css-loader", // 2. Menerjemahkan CSS menjadi CommonJS
        ],
      },
    ],
  },

  // 5. Plugins: Menambahkan fungsionalitas ekstra
  plugins: [
    new HtmlWebpackPlugin({
      // Menggunakan file index.html kita sebagai template
      template: "./index.html",
      // Nama file HTML yang akan dihasilkan di folder 'dist'
      filename: "index.html",
    }),
  ],

  // 6. Konfigurasi Dev Server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000, // Anda bisa ganti port jika 9000 terpakai
    open: true, // Otomatis membuka browser
  },
};
