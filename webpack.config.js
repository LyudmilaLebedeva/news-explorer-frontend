const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    savednews: './src/savednews/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        isDev ? 'style-loader'
          : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
      ],
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: 'images/[name].[ext]',
            publicPath: './',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            esModule: false,
            publicPath: './',
          },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
          publicPath: '',
        },
      },
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssNano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/savednews/index.html',
      filename: 'savednews.html',
      chunks: ['savednews'],
    }),
  ],
};
