'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./config.js');

let libName = 'createLanguageSelection';

module.exports = [{
    entry: path.resolve('src', 'main.jsx'),
    output: {
        path: path.resolve('lib'),
        filename: 'language_selection.min.js',
        publicPath: '/',
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [],
    plugins: [
        config.plugins.provide(),
        config.plugins.define.prod,
        config.plugins.uglify
    ],
    module: {
        loaders: [
            config.loaders.babel
        ]
    }
}, {
    entry: path.resolve('src', 'main.jsx'),
    output: {
        path: path.resolve('lib'),
        filename: 'language_selection.js',
        publicPath: '/',
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [],
    plugins: [
        config.plugins.provide(),
        config.plugins.define.prod,
        // config.plugins.uglify
    ],
    module: {
        loaders: [
            config.loaders.babel
        ]
    }
}, {
    entry: path.resolve('src', 'main.jsx'),
    output: {
        path: path.resolve('lib'),
        filename: 'language_selection-lib-only.min.js',
        publicPath: '/',
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [],
    plugins: [
        config.plugins.define.prod,
        config.plugins.uglify
    ],
    module: {
        loaders: [
            config.loaders.babel
        ]
    }
}, {
    entry: ['babel-polyfill', path.resolve('src', 'main.jsx')],
    output: {
        path: path.resolve('lib'),
        filename: 'language_selection-with-polyfills.min.js',
        publicPath: '/',
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [],
    plugins: [
        config.plugins.provide(),
        config.plugins.define.prod,
        config.plugins.uglify
    ],
    module: {
        loaders: [
            config.loaders.babel
        ]
    }
}];