const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ENV_CONF = require('./environment/dev.env.ts');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
        poll: 5
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                // exclude: /node_modules/,
                use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                include: [
                    path.join(__dirname, 'src/'),
                    path.join(__dirname, 'node_modules/slucky/sass/')
                ]
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            }, {
                test: /.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader'
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
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(ENV_CONF)
        }),
        new MiniCssExtractPlugin({
            filename: 'slucky.css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'), //模板
            filename: 'index.html',
            hash: true, //防止缓存
            title: 'slucky',
            minify: false
        }),
        require('autoprefixer'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin() //用户名替代id,更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
    ],
    //开发服务器
    devServer: { //配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 8080, //端口号
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        overlay: { //当有编译错误或者警告的时候显示一个全屏overlay
            errors: true,
            warnings: true
        }
    }
};
