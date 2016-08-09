var webpack = require("webpack"),
    path = require('path');

// Everything will go into the build/ folder
var buildPath = path.resolve(__dirname, 'build/');

module.exports = {
    target: "web",
    devtool: 'source-map',
    entry: {
      main: "./src/entry.js" // This is the bundle of app code.
    },
    output: {
        path: buildPath,
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            // CSS stylesheets
            { test: /\.css$/, loader: "style!css" },
            { // Sass loader
              test: /\.scss$/,
              loaders: ["style", "css", "sass"]
            }, // Images in Sass/css and js
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { // Transpile es6 and react-jsx resources
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [ // Webpack puts common code in this bundle. Make sure it's loaded before the main bundle
      new webpack.optimize.CommonsChunkPlugin("common", "common.bundle.js")
    ]
};
