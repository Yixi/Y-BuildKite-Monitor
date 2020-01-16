const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const webpack = require('webpack')

const PORT = 4321
const _HOST = '0.0.0.0'
const HOST = `http://${_HOST}`
const URL = `${HOST}:${PORT}`

module.exports = {
  entry: [
    `webpack-dev-server/client?${URL}`,
    'webpack/hot/only-dev-server',
    '../src/index.tsx'
  ],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
  },
  context: path.resolve(__dirname, "../src"),
  devtool: "cheap-module-source-map",
  devServer: {
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    },
    hot: true,
    // enable HMR on the server
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    // match the output path
    port: PORT,
    host: _HOST,
    publicPath: URL,
    historyApiFallback: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            }
          },
          "postcss-loader",
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: ["url-loader"],
      },
      {
        test: /\.(svg?)(\?[a-z0-9]+)?$/,
        use: ["url-loader"],
      },
    ]
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      tslint: path.resolve(__dirname, "../tslint.json"),
    }),
    new HTMLWebpackPlugin({
      template: "../src/app.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
