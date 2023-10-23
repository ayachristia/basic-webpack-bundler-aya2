const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path')

module.exports = {
    mode: 'production', // devlopment mode doesn't minimize
    // mode: process.env.environment == "production" ? "production" : "development",
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
                use:
                    [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "images/tacos.png"
                            },
                        }
                    ]
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader",]
            },
        ],

    },
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            mozjpeg: {
                                quality: 100,
                            },
                            webp: {
                                lossless: 1,
                            },
                            avif: {
                                cqLevel: 0,
                            },
                            png: {
                                quality: 100,
                            },
                        },
                    }
                }
            })
        ]
    },
    devtool: "source-map",
    devServer: {
        static: './dist',
    }
}
