'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');

const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

const dev = process.env.NODE_ENV === 'development';
const production = process.env.NODE_ENV === 'production';

const config = {
  devtool: dev ? 'cheap-source-map' : undefined,

  entry: {
    app: [
      path.resolve(__dirname, 'client', 'entry.js'),
    ].concat(dev ? [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client?reload=true',
    ] :
		[]),
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
    chunkFilename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'client', 'scripts'),
      path.resolve(__dirname, 'client', 'styles'),
      path.resolve(__dirname, 'client', 'media'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {},
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(svg|woff|woff2|png|jpg|jpeg|gif|m4a|mp4|webm|pdf)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: `media/${production ? '[hash:8]' : '[name]'}.[ext]`,
        },
      },
      {
        test: /\.scss$/,
        loader: dev ?
					'style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:8]&camelCase!postcss-loader!sass-loader' :
					ExtractTextPlugin.extract({
            notExtractLoader: 'style',
            loader: 'css-loader?modules&localIdentName=[hash:8]&camelCase!postcss-loader!sass-loader',
          }),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, 'client', 'index.html'),
      favicon: path.resolve(__dirname, 'client', 'favicon.ico'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !dev,
      debug: dev,
      options: {
        context: __dirname,
        sassLoader: {
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'client', 'styles'),
          ],
        },
        postcss: [
          autoprefixer({ browsers: ['last 2 version'] }),
        ].concat(dev ?
					[] :
					[csswring({ removeAllComments: true })]
        ),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ].concat(dev ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new V8LazyParseWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true, // eslint-disable-line camelcase
        drop_console: true, // eslint-disable-line camelcase
        evaluate: true,
        if_return: true, // eslint-disable-line camelcase
        join_vars: true, // eslint-disable-line camelcase
        negate_iife: false, // eslint-disable-line camelcase
      },
    }),
    new ExtractTextPlugin(`styles/${production ? '[contenthash:8]' : '[name]'}.css`),
  ]),
};

module.exports = config;
