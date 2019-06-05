var UglifyJSPlugin = require('uglifyjs-webpack-plugin');//压缩代码
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //单独呀打包css文件
var webpack = require('webpack');
var providePlugin = new webpack.ProvidePlugin({$:'jquery',jQuery:'jquery','window.jQuery':'jquery'});
module.exports = {
    mode: 'none',
    entry: {
        index: "./src/js/entry.js",
        goodsInfo: "./src/js/goodsInfo.js"
    },
    output: {
        filename: '[name].js',// [hash:8]只要有文件发生变化所有文件名都会变化 [chunkhash:8] 只有发生变化的模块对应的文件名变化
        path: __dirname + '/out',
        publicPath:'http://localhost:8080/out'  //当浏览器需要引用输入静态资源文件时，这个配置指定输入文件的公共地址。当文件的href或者url()与它磁盘上的路径不一致时就应当用publicPath
    },
    module:{
        rules: [
            {test: /.js$/,use: ['babel-loader']},// 解析es6  js文件用什么加载器解析
            // {test:/.css$/,use:['style-loader','css-loader']}, //css文件用css-loader解析，style-loader加载 
            {
                test:/.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {test:/.jpg|png|gif|svg/, use:['url-loader?limit=8192&name=./[name].[ext]']},
            {test:/.less$/, use:['style-loader', 'css-loader', 'less-loader']},
        ]
    },
    //压缩插件配置
    plugins: [
        new UglifyJSPlugin(),
        new ExtractTextPlugin('[name].css'),
        providePlugin
    ],
    // optimization: {
    //     splitChunks: {
    //         minSize:0,
    //         cacheGroups: {
    //             commons: {
    //                 name:'commons',
    //                 chunks:'initial',
    //                 minChunks:2
    //             }
    //         }
    //     }
    // }
};