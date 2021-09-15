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
        entry: '/index.js',

        // куда кладём результат работы вебпака
        output: {
            filename: isDev  ? `[name].js` : `[name].[hash].js`,
            path: path.resolve(__dirname, 'dist'),
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
        ]

    }
}