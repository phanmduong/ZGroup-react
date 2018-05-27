module.exports = {
    context: __dirname + "/app",

    entry: {
        app: "./js/app.js",
    },

    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
        ]
    }
};