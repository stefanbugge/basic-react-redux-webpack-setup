var webpack = require("webpack"),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const extractSASS = new ExtractTextPlugin('stylesheets/[name].css');

// Everything will go into the build/ folder
var buildPath = path.resolve(__dirname, 'build/');

module.exports = {
    target: "web",
    devtool: 'source-map',
    entry: [ './src/entry', 'bootstrap-loader/extractStyles' ],
    output: {
        path: buildPath,
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            // CSS stylesheets
            { test: /\.css$/, loader: "style!css" },

            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { // Bootstrap fonts
              test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url?limit=10000',
            },
            { // Bootstrap fonts
              test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
              loader: 'file',
            },
            { // Transpile es6 and react-jsx resources
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    cacheDirectory: true
                }
            },
            { test: /\.scss/i, loader: extractSASS.extract(['css','sass']) },
            { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" }
        ]
    },
    plugins: [ // Webpack puts common code in this bundle. Make sure it's loaded before the main bundle
      new webpack.optimize.CommonsChunkPlugin("common", "common.bundle.js"),
      extractCSS,
      extractSASS
    ]
};
