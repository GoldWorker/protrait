const common = require('./webpack.common');
const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.prod');

module.exports = function(env, arg) {
    console.log(env, arg.mode);
    if (arg.mode == 'development') {
        return Object.assign({}, common, devConfig);
    }
    switch (env) {
        case 'prod':
            return Object.assign({}, common, proConfig);
    }
};
