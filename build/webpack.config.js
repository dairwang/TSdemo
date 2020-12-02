const {merge} = require('webpack-merge')
// 这里之前一直没有采用最新写法,项目开启时 merge is not function  后采用花括号最新写法 项目成功启动
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};