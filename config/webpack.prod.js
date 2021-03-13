const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
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
    chunkFilename: '[name].[hash].js',
    publicPath: '/dist',
    path: path.resolve(__dirname, '../dist'),
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
              publicPath: '../dist/',
              hmr: false,
            },
          }, 'css-loader', 'sass-loader'],
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
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '..', 'dist/*')],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
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
  ],
};
