'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    loaders: {
        babel: {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['add-module-exports']
            }
        }
    },
    plugins: {
        provide: (obj = {
            React: 'react',
            createFragment: 'react-addons-create-fragment',
            ReactDOM: 'react-dom',
            Redux: 'redux',
            ReactRedux: 'react-redux'
        }) => new webpack.ProvidePlugin(obj),
        define: {
            dev: new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            prod: new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        },
        uglify: new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        wbpDev: (template = 'index.tpl.html', inject = 'head', name = 'index.html') => new HtmlWebpackPlugin({
            template: template,
            inject: inject,
            filename: name
        })
    }
};
