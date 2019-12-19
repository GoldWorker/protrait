const path = require('path');

module.exports = {
    //入口配置
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    //出口配置
    resolve: {
        alias: {
            $: './src/jquery.js'
        },
        extensions: ['.js', '.css', '.json', '.jsx']
    }
};
