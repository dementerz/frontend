// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
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
    // publicPath: '/l4/dist'
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
    // new HtmlWebpackPlugin({
    //   title: 'Фото',
    //   filename: 'pages/photo.html',
    //   template: __dirname + '/src/pages/photo.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Расписание',
    //   filename: 'pages/rozklad.html',
    //   template: __dirname + '/src/pages/rozklad.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Новости',
    //   filename: 'pages/news.html',
    //   template: __dirname + '/src/pages/news.html',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Шутка',
    //   filename: 'pages/joke.html',
    //   template: __dirname + '/src/pages/joke.html',
    // }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "images" },
      ],
    }),
  ],

  module: {
    rules: [

    ]
  },
}