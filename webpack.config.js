// Node JS code here

const path = require('path'); // для корректного указания путей
HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для работы с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './js/index.js', // чанк main
        analitics: './js/analitics.js', // чанкт аналитики 
    } ,
    // Описание бандла (-лов):
    output: { 
        filename: '[name].bundle.[hash].js', // имя
        path: path.resolve(__dirname, 'dist'), // куда положить
        clean: true, // очистить перед новой сборкой (как альтернатива плагину clean-webpack-plugin)
    },
    // Плагины для задач
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html', // какой шаблон html генерировать в dist
            inject: 'body', // куда добавлять скрипты true || 'head' || 'body' || false
        }),
        new CleanWebpackPlugin(),
    ],
    // По умолчанию вебпак работает только с JS файлами. Чтобы обрабатывать например стили, нужно подключить соответствующие лоадеры 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // выполняются от последнего к первому
                // css-loader - позволяет импортировать css файлы в js
                // style-loader - добавляет стили в теге <style> html
            },
        ]
    },
    devServer: {
        port: 8888
    },
    // optimization: {
    //     minimize: false,
    // },
};