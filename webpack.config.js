const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name].bundle.js'
    },
    devServer:{
        port: 4000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: 'css-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    resolve:{
        extensions: ['.js','.jsx']
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: 'index.html'
        })
    ]
}