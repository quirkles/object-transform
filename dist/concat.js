'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _utils = require('./utils');

exports.default = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return (0, _ramda.pipe)(_ramda.applyTo, (0, _utils.fChain)(fns));
};