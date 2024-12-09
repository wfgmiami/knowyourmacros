const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/browser/react/index.js'),
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
            'react-hmre',
            'flow'
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    alias: {
      app: browserPath(''),
      assets: browserPath('assets'),
      browser: browserPath(''),
      containers: browserPath('react/containers'),
      colorCSS: browserPath('react/colorCSS'),
      components: browserPath('react/components'),
      reducers: browserPath('redux/reducers'),
      theme: browserPath('react/theme'),
      utils: browserPath('utils')
    }
  }
};

function browserPath(txt) {
  return path.join(__dirname, `/browser/${txt}`);
}
