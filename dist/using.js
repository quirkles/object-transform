'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _get2 = require('./get');

var _get3 = _interopRequireDefault(_get2);

var _index = require('./index');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _using = function _using() {
  var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    get: function get(target) {
      return (0, _get3.default)(attr + '.' + target);
    },
    do: function _do(fn) {
      return (0, _ramda.pipe)((0, _get3.default)(attr), (0, _utils.doIfNotNull)(fn));
    },
    using: function using(nestedAttr) {
      return _using(attr + '.' + nestedAttr);
    },
    shape: function shape(schema) {
      return (0, _ramda.pipe)((0, _get3.default)(attr), (0, _index.shape)(schema));
    }
  };
};

exports.default = _using;