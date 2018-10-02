const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true,
});
const appPath = path.join(__dirname, 'web');
const sources = path.join(__dirname, 'src');

module.exports = {
    entry: './src/index.js',
    output: {
        path: appPath,
        filename: 'bundle.js?[hash]',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(css|styl)$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1, sourceMap: false}
                        },
                        {
                            loader: 'stylus-loader',
                            options: {sourceMap: false},
                        },
                    ]
                })
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
                        name: 'assets/images/[name].[ext]?[hash]'
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
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: false
        }),
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
            uglifyOptions: {
                compress: true
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz',
            algorithm: 'gzip',
            test: /\.js|\.css|\.html$|\.woff$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
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
            sources: path.resolve(__dirname, 'src')
        }
    }
};

