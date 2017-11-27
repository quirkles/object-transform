'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var getOr = function getOr(fallback, attr, input) {
  return (0, _ramda.pathOr)(fallback, (0, _ramda.split)('.', attr), input);
};

var curriedGetOr = (0, _ramda.curry)(getOr);

exports.default = curriedGetOr;