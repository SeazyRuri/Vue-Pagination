const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all');
module.exports = {
    entry: {
        index:'./src/index.js',
        vue: 'vue',
    },
    mode: 'development',
    // devtool: '#source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/javascripts'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }]

                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            'Vue': 'vue'
        }),
        new HtmlWebpackPlugin({
            filename: '../../index.html', //基于output的路径
            template: './src/index.html', //基于配置的路径
            chunks: ['manifest', 'vue', 'index', ],
            chunksSortMode: 'manual', //按照上面的chunks顺序
        }),
        new ExtractTextPlugin("../stylesheets/[name].css"), //基于output的路径
        new PurgecssPlugin({
            paths: glob.sync([
                path.join(__dirname, `./src/view/*.html`),
                path.join(__dirname, `./src/vue/*.vue`),
                path.join(__dirname, `./src/*.js`)
            ])
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vue: {
                    test: 'vue',
                    name: 'vue',
                    chunks: 'initial',
                    priority: 10
                },

            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
};