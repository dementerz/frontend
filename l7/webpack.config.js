// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs')

const pages = fs
    .readdirSync(path.resolve(__dirname, './src/pug/pages/'))
    .filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      template: __dirname + '/src/pug/pages/' + page,
      filename: `./${page.replace(/\.pug/, '.html')}`
    })),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "images" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(sass|scss|css|less|styl)$/,
        exclude: '/node_modules/',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'less-loader',
          'stylus-loader',
        ],
      }
    ]
  },
}