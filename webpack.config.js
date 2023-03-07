// Node JS code here

const path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js', // чанк main
        analitics: './src/js/analitics.js' // чанкт аналитики 
    } ,
    // Описание бандла (-лов):
    output: { 
        filename: '[name].bundle.[hash].js', // имя
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
        port: 8888
    },
    optimization: {
        minimize: false,
    },
};