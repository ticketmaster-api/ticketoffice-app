var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    noParse: ['ws']
  },
  externals: ['ws'],
  node: {
    fs: "empty"
  }
};

const commonLoaders = [
  { test: /\.(png|jpg|gif|jpeg|woff|svg)$/, loader: 'url-loader?limit=8192'},
  { test: /\.json$/, loader: "json"}
];

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  include: __dirname
};
const babelLoaderQuery = {
  query: {
    env: {
      development: {
        plugins: [
          [
            "react-transform", {
              transforms: [
                {
                  transform:  'react-transform-hmr',
                  imports: ['react'],
                  locals:  ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react','redbox-react' ]
                }
              ]
            }
          ]
        ]
      }
    },
    presets: ['es2015', 'stage-2', 'react']
  }
};

const babelLoaderDev = merge(babelLoader, babelLoaderQuery)

if (process.env.NODE_ENV === 'production') {

  webpackConfig = merge(webpackConfig,{
    devtool: "source-map",
    entry : [
      './src/client/index.js'
    ],
    module: {
      loaders: [
        ...commonLoaders,
        babelLoader,
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
      ]
    },
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin("app.css"),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  });

} else {

  webpackConfig = merge(webpackConfig,{
    devtool: 'inline-source-map',
    module: {
      loaders: [
        ...commonLoaders,
        babelLoaderDev,
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    entry : [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]
  });

}

module.exports = webpackConfig;
