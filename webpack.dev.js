// const merge = require('webpack-merge');
let { main, renderer } = require('./webpack.common.js');

const MODE = 'development';

Object.assign(main, {
  mode: MODE,
});

Object.assign(renderer, {
  mode: MODE,
});

module.exports = [main, renderer];
