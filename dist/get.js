'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

exports.default = function () {
  var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _ramda.pathOr)(fallback, (0, _ramda.split)('.', attr));
};