// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs')

const pages = fs
  .readdirSync(path.resolve(__dirname, './src/pages/'))
  .filter(fileName => fileName.endsWith('.html'))

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
      title: page.split('.')[0] + ' page',
      template: __dirname + '/src/pages/' + page,
      filename: 'pages/' + page
    })),
    new HtmlWebpackPlugin({
      title: 'webpack App main',
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
      inject: 'body'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "images" },
        { from: "./src/js", to: "js" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss|css|less|styl)$/,
        exclude: '/node_modules/',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'stylus-loader',
          'sass-loader',
        ],
      }
    ]
  },
}