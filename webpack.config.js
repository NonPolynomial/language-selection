'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./config.js');

module.exports = {
    devtool: '#cheap-module-inline-source-map',
    entry: ['babel-polyfill', path.resolve('src', 'main.jsx')],
    output: {
        path: path.resolve('lib'),
        filename: 'language_selection.js',
        publicPath: './',
        library: 'createLanguageSelection',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [],
    plugins: [
        config.plugins.provide(),
        config.plugins.define.dev,
        config.plugins.wbpDev('testing/index.tpl.html','head','index.html')
    ],
    module: {
        loaders: [
            config.loaders.babel
        ]
    }
};
