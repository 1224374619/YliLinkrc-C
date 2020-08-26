const path = require('path');



function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    lintOnSave: true,
    devServer: {
        port: 443,
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            '/api': {
                // target: 'https://www.yinlinkrc.com/api/v1',// target host
                // target: 'https://www.yinlinkrc.com/api/v1',// target host
                target: 'https://www.yinlinkrc.com/api/v2', // target host
                // target: 'http://192.168.1.108:8081', // target host
                ws: true, // proxy websockets
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {  
                    '^/api': '' // rewrite path
                }
            },
        },
    },
    chainWebpack: (config) => {
        config.entry('main').add('babel-polyfill') // main是入口js文件
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('utils', resolve('src/utils'))
            .set('apis', resolve('src/apis'))
            .set('store', resolve('src/store'))
            .set('theme', resolve('src/theme'))
    }
}
