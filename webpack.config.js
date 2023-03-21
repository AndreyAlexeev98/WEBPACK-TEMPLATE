// imports
const path = require("path"); // Для корректного импорта путей
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Плагин для работы с html
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Очистка выходных файлов
const BrowserSyncPlugin = require("browser-sync-webpack-plugin"); // для разработки фронта
const CopyPlugin = require("copy-webpack-plugin"); // Для перемещения файлов
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // генерирует отдельные css файлы
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // оптимизация и минификация CSS
const TerserPlugin = require("terser-webpack-plugin"); // минификация js
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // для работы по оптимизации

// определение переменных окружения для разных настроек сборки
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

// минификация файлов в зависимости от переменной окружения
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, "./"), // относительно какой папки берутся все пути в сборке
  entry: "./js/index.js", // входная точка
  output: {
    filename: "bundle.js", // имя выхода
    path: path.resolve(__dirname, "../static/dist"), // место выхода
    // clean: true, // очистить перед новой сборкой (как альтернатива плагину clean-webpack-plugin)
  },
  optimization: optimization(), // конциг оптимизации (минификации) файлов
  resolve: {
    extensions: ["js", "json"], // пеерчисленные расширения теперь можно не указывать в файлах при иморте
    alias: {
      "@jsComponentsPath": path.resolve(__dirname, "js/components"), // для сокращения путей (актуально когда будет подобное - ../../../ ... )
      "@jsPagesPath": path.resolve(__dirname, "js/pages"),
    },
  },
  devtool: isDev ? "source-map" : "", // Добавить sourcemap к js и css в режиме разработки
  devServer: { // Когда проект без бекенда, как альтернатива Browser Sync
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // работа с js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i, // Обработка css
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // генерирует css в отдельный файл
            options: {
              // ... // возможны доп. настройки
            },
          },
          "css-loader", // чтобы был возможен импорт css в js
          "sass-loader", // компиляция sass в css
        ],
      },
      {
        test: /\.(png|jpe?g|svg|webp|gif|ico)$/i, // Для использования файлов данных форматов в js
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    // инифиализации плагинов и их настройки
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({ // В npm скрипте должен быть флаг --watch 
      port: 8888, // порт открытия
      proxy: "localhost:41080", // откуда перехватить (полезно когда уже развернут сервер, в проеках с бекендом)
      files: ["../**/*.html"], // за какими файлами следить, и перезагружать при изменении
    }),
    new CopyPlugin({
      patterns: [{ from: "./icons/**.*", to: "./" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // паттерн [name] полезен когда в js импортим несколько css файлов
    }),
    new HtmlWebpackPlugin({
      template: "./html/index.html", // какой шаблон html генерировать в dist
      inject: "body", // куда добавлять скрипты true || 'head' || 'body' || false
    }),
    // new BundleAnalyzerPlugin()
  ],
};
