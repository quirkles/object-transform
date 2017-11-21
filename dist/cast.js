'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _get = require('../src/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    asString: (0, _ramda.pipe)((0, _get2.default)(attr), String),
    asNumber: (0, _ramda.pipe)((0, _get2.default)(attr), Number),
    asBool: (0, _ramda.pipe)((0, _get2.default)(attr), Boolean)
  };
};