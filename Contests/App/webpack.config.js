const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        "babel-polyfill",
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, 'public/www/'),
        filename: "js/bundle.js"
    },    
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/, /lib/]
            },
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [/node_modules/, /public/, /lib/]
            },
            {
                test: /\.sass$/,
                loader: "style-loader!css-loader!autoprefixer-loader!sass",
                exclude: [/node_modules/, /public/]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/templates/index.html", to: "index.html" }
        ]),
        new webpack.ProvidePlugin({
            Promise: "imports?this=>global!exports?global.Promise!es6-promise",
            fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
        })
    ]
};
