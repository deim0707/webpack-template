const HTMLWebpackPlugin = require('html-webpack-plugin'); // создаёт нам хтмл файл на основе рукописного. с правильно подключенными импортами
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // удаляет ненужные файлы (со старыми хешами)
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); // добавляет стили в отдельный файл, может добавлять кэши


const path = require('path');

// функци в зависимости от режиме разработки возвращает шаблон имени файла
// например, хеши у файлов нам нужны только в режиме продакшен
const getFileName = (isDev, extension) => isDev ? `[name].${extension}` : `[name].[hash].${extension}`;

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const isProduction = !isDev;
    console.log({isDev, isProduction})

    return {
        // указываем, где лежат все исходники с которыми работает вебпак
        // дальше внизу можно не прописывать src в пути
        context: path.resolve(__dirname, 'src'),

        // значение по умолчанию. при запуске вебпака можем указать другую опцию: webpack --mode production
        mode: 'development',

        // точка входа в приложение. можно задать несколько точек входа оъектом
        entry: '/index.tsx',

        // куда кладём результат работы вебпака
        output: {
            filename: getFileName(isDev, 'js'),
            path: path.resolve(__dirname, 'dist'),
        },

        // source-map позволяет в девтулзах перейти к исходному коду, т.е. не преобразованному
        devtool: isDev ? 'source-map' : false,

        resolve: {
            // какие расширения нужно понимать по умолчанию (если не указывать, то есть значение по умолчанию)
            // например, мы можем не писать '.js' у файлов при импорте
            extensions: ['.tsx', '.ts', '.js'],
            // помогает избавиться от большой вложенности в импорте. например, когда стоят много '../../../../../src/Post.js'. теперь мы сможем написать import Post from "src/Post"
            alias: {
                'src': path.resolve(__dirname, 'src'),
            }
        },

        // каждый плагин это экземпляр классов. добавляем их через NEW
        plugins: [
            new HTMLWebpackPlugin({
                // template - указали на основе какого хтмл файла ему работать
                template: "./index.html",
                // минифицируем хтмл
                minify: {
                    // хтмл в одну строку
                    collapseWhitespace: isProduction,
                }
            }),
            new CleanWebpackPlugin(),
            // выносит ксс в отдельный файл
            new MiniCSSExtractPlugin({
                filename: getFileName(isDev, 'css'),
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        'css-loader' //позволяет вебпаку понимать импорты и импортировать ксс
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                }
            ]
        }

    }
}