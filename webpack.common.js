const path = require("path");

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const LIBS_PATH = path.resolve(__dirname, 'libs');
const LIBRARY_NAME = 'ogl';
const LIBRARY_TARGET = 'umd';

const entry = {
};

entry['index'] = path.join(SRC_PATH, 'index.ts');

module.exports = {
  entry: entry,

  externals: [
    /^(ogl|\$)$/i,
    // /^(gbuffer|\$)$/i,
  ],

  output: {
    filename: '[name].js',
    path: BUILD_PATH,
    library: LIBRARY_NAME,
    libraryTarget: LIBRARY_TARGET
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.vert$/,
        use: 'raw-loader'
      },
      {
        test: /\.frag$/,
        use: 'raw-loader'
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false //todo; remove when errors in ogl fixed.
          }
        },
        // exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: [PUBLIC_PATH],
    contentBasePublicPath: ['/'],
    writeToDisk: true,
    port: 8085
    //     watchContentBase: true,
  },
  resolve: {
    modules: [SRC_PATH, path.resolve(__dirname, 'node_modules'), LIBS_PATH],
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};