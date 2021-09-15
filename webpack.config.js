const HTMLWebpackPlugin = require('html-webpack-plugin'); // создаёт нам хтмл файл на основе рукописного. с правильно подключенными импортами
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // удаляет ненужные файлы (со старыми хешами)

const path = require('path');

const isDev = false;
const isProduction = !isDev;

module.exports = {
    // указываем, где лежат все исходники с которыми работает вебпак
    // дальше внизу можно не прописывать src в пути
    context: path.resolve(__dirname, 'src'),

    // значение по умолчанию. при запуске вебпака можем указать другую опцию: webpack --mode production
    mode: 'development',

    entry: '/index.js',

    output: {
        filename: isDev  ? `[name].js` : `[name].[hash].js`,
        path: path.resolve(__dirname, 'dist'),
    },

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
    ]

}