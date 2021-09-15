const HTMLWebpackPlugin = require('html-webpack-plugin'); // создаёт нам хтмл файл на основе рукописного. с правильно подключенными импортами
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // удаляет ненужные файлы (со старыми хешами)

const path = require('path');

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
            filename: isDev  ? `[name].js` : `[name].[hash].js`,
            path: path.resolve(__dirname, 'dist'),
        },

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
        ],

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ]
        }

    }
}