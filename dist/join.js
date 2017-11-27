'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _utils = require('./utils');

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValues = function getValues(attrs, input) {
  return (0, _ramda.map)((0, _get2.default)(_ramda.__, input), attrs);
};

var myJoin = function myJoin(separator, attrs, input) {
  return (0, _ramda.join)(separator, (0, _utils.filterNulls)(getValues(attrs, input)));
};

exports.default = (0, _ramda.curry)(myJoin);