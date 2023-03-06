// Node JS code here

const path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js', // точка входа
    // Описание бандла (-лов):
    output: { 
        filename: 'bundle.js', // имя
        path: path.resolve(__dirname, 'dist'), // куда положить
        clean: true, // очистить перед новой сборкой
    },
    // Плагины для задач
    plugins: [
        new HtmlWebpackPlugin()
    ],
    // По умолчанию вебпак работает только с JS файлами. Чтобы обрабатывать например стили, нужно подключить соответствующие лоадеры 
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // выполняются от последнего к первому
            },
        ]
    },
    devServer: {
        port: 3000
    },
    optimization: {
        minimize: false,
    },
};