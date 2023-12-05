const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  mode: isProduction ? 'production' : 'development',
  output: {
    // Improve SSR support by using "this" instead of "self" on the global
    // object. By default webpack will fallback window calls to "self", which
    // do not exist in node, by replacing this with "this" we can safely import
    // the lib in a node environment
    //
    // Reference: https://webpack.js.org/configuration/output/#outputglobalobject
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'editor.min.js' : 'editor.js',
    library: {
      name: 'VideomatikEditor',
      type: 'umd',
    },
  },
};
