let { main, renderer } = require('./webpack.common.js');

const MODE = 'production';

Object.assign(main, {
  mode: MODE,
});

Object.assign(renderer, {
  mode: MODE,
});

module.exports = [main, renderer];
