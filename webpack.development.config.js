const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const sources = path.join(__dirname, 'src');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                enforce: 'pre',
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('development')
        }),
    ],
    resolve: {
        extensions: [".js", ".styl", ".png", ".jpg", ".svg", ".gif", ".woff"],
        modules: [
            path.join(sources, 'fonts'),
            path.join(sources, 'images'),
            path.join(__dirname, 'node_modules'),
            sources
        ],
        alias: {
            images: path.resolve(sources, 'assets', 'images'),
            fonts: path.resolve(sources, 'assets', 'fonts'),
            sources: path.resolve(__dirname, 'src')
        }
    }
};

