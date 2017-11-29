'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = function extend(schema, input) {
  return (0, _ramda.merge)(input, (0, _shape2.default)(schema, input));
};

exports.default = (0, _ramda.curry)(extend);