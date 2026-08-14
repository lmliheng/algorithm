const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin }= require('clean-webpack-plugin')
module.exports = {
    // mode: 'development',
    entry: '/src/index.js',
    cache: false,
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle_[hash].js',
        clean: true // 每次打包清空上一次打包内容
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: '[hash].html'
        }),

    ]

}