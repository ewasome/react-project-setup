const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SECURE = !!process.env.npm_config_secure;
const HOST = process.env.npm_config_host || 'localhost';
const PORT = process.env.npm_config_port || 3001;

module.exports = {
  mode: 'development',
  entry: {
    main: [
      './src/index.js',
      './src/scss/style.scss',
    ],
    // "other-if-needed": [
    //   './src/other.js',
    //   './src/scss/style.scss',
    // ],
  },
  output: {
    filename: '[name].js',
    pathinfo: true,
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', './src'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      config: path.resolve(__dirname, '..', './src/config'),
      util: path.resolve(__dirname, '..', './src/util'),
      const: path.resolve(__dirname, '..', './src/const'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|woff|woff2|ttf|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(yml|yaml)$/,
        use: ['json-loader', 'yaml-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    https: SECURE,
    port: PORT,
    host: HOST,
    hot: true,
    compress: true,
    inline: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new HtmlWebpackPlugin({
    //   chunks: ['other-if-needed'],
    //   filename: 'other.html',
    //   template: './src/other.html',
    //   templateParameters: {
    //     someParam: 'value',
    //   }
    // }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      title: 'JS Project',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
