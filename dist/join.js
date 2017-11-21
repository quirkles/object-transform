'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _utils = require('./utils');

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValues = function getValues(attrList) {
  return (0, _utils.fMap)((0, _ramda.map)(_get2.default, attrList));
};

exports.default = function () {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  return (0, _ramda.pipe)(_ramda.applyTo, getValues(attrs), _utils.filterNulls, (0, _utils.doIfNotEmpty)((0, _ramda.join)(separator)));
};