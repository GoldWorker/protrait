const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 图表分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ENV_CONF = require('./environment/prod.env.ts');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                sideEffects: true
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                include: [
                    path.join(__dirname, 'src/'),
                    path.join(__dirname, 'node_modules/slucky/sass/')
                ],
                sideEffects: true
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }],
                sideEffects: true
            }, {
                test: /.jsx|.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        // mimetype: 'image/png',
                        // fallback: 'responsive-loader',
                        quality: 100
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /\.(eot|ttf|woff)$/,
                use: 'file-loader'
            }, {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                commons: { // 抽离自己写的公共代码，commons这个名字可以随意起
                    chunks: 'initial',
                    name: 'commons', // 任意命名
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    //插件
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(ENV_CONF)
        }),
        new DashboardPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            logLevel: 'info'
        }),
        new CleanWebpackPlugin('dist', {
            verbose: false,
            watch: true,
            exclude: ['.git']
        }), //打包前先清空
        new MiniCssExtractPlugin({
            filename: 'slucky.css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'), //模板
            filename: 'index.html',
            hash: true, //防止缓存
            title: 'BRandF',
            minify: {
                removeAttributeQuotes: true, //压缩 去掉引号
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new UglifyjsWebpackPlugin({
            uglifyOptions: {
                ie8: false,
                mangle: true,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    unused: false
                }
            },
            sourceMap: false,
            cache: true
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
};
