const path = require('path');
const nodeExternals = require('webpack-node-externals');

const tsLoaderRule = {
  test: /\.(ts|tsx)$/,
  use: ['ts-loader']
}

const common = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "app/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      tsLoaderRule
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts',  '.js', '.json']
  }
}

const renderer = Object.assign({}, common, {
  target: 'electron-renderer',
  entry: {
    renderer: './app/src/renderer/index.tsx'
  },
  module: {
    rules: [
      tsLoaderRule,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
});

const main = Object.assign({}, common, {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    main: './app/src/main/index.ts',
  },
});

module.exports = [main, renderer];
