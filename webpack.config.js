// todo разбить конфиг на ПРОД \ ДЕВ версии? и смёржить с общим для них вебпаков через webpack-merge

const HTMLWebpackPlugin = require('html-webpack-plugin'); // создаёт нам хтмл файл на основе рукописного. с правильно подключенными импортами
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // удаляет ненужные файлы (со старыми хешами)
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); // добавляет стили в отдельный файл, может добавлять кэши
const ESLintPlugin = require('eslint-webpack-plugin');

const path = require('path');

// функци в зависимости от режиме разработки возвращает шаблон имени файла
// например, хеши у файлов нам нужны только в режиме продакшен
const getFileName = ({ isDev, extension }) =>
    isDev ? `[name]${extension}` : `[name].[contenthash:5]${extension}`;

const getStyleLoader = ({ isSASS }) => {
    const styleLoader = [
        MiniCSSExtractPlugin.loader,
        //позволяет вебпаку понимать импорты и импортировать ксс
        { loader: 'css-loader' },
        'postcss-loader',
    ];
    // если это sass, то добавляем опции хэширования имени класса и сасс-лоадер
    if (isSASS) {
        styleLoader[1].options = {
            modules: {
                // в случае scss в сборку кладём селектор по хешу
                localIdentName: '[local]_[hash:base64:4]',
            },
        };
        styleLoader.push('sass-loader');
    }

    return styleLoader;
};

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const isProduction = !isDev;
    console.log({ isDev, isProduction });

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
            filename: getFileName({ isDev, extension: '.js' }),
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
                src: path.resolve(__dirname, 'src'),
            },
        },

        // каждый плагин это экземпляр классов. добавляем их через NEW
        plugins: [
            new HTMLWebpackPlugin({
                // template - указали на основе какого хтмл файла ему работать
                template: './index.html',
                // минифицируем хтмл
                minify: {
                    // хтмл в одну строку
                    collapseWhitespace: isProduction,
                },
                favicon: './assets/favicon.ico',
            }),
            new CleanWebpackPlugin(),
            // выносит ксс в отдельный файл
            new MiniCSSExtractPlugin({
                filename: getFileName({ isDev, extension: '.css' }),
            }),
            new ESLintPlugin({
                extensions: ['js', 'ts', 'tsx'],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: getStyleLoader({ isSASS: false }),
                },
                {
                    test: /\.s[ac]ss$/,
                    use: getStyleLoader({ isSASS: true }),
                },
                {
                    // todo хорошо бы попытаться избавить здесь от file-loader, но оставить возможность работать с свг как с компонентом или урл
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                        },
                        {
                            loader: 'file-loader',
                            options: {
                                name: `assets/${getFileName({
                                    isDev,
                                    extension: '.svg',
                                })}`,
                            },
                        },
                    ],
                    type: 'javascript/auto',
                },
                {
                    test: /\.(png|jpg|gif|ttf|woff|woff2|eot)/,
                    type: 'asset/resource',
                    generator: {
                        // todo можно разбить по отдельным папкам. изображения. шрифты и т.д.
                        filename: `assets/${getFileName({
                            isDev,
                            extension: '[ext]',
                        })}`,
                    },
                },
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader'],
                },
            ],
        },
    };
};
