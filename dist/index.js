'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shape = exports.extend = exports.cast = exports.concat = exports.using = exports.join = exports.each = exports.getOr = exports.get = undefined;

var _utils = require('./utils');

var _get2 = require('./get');

var _get3 = _interopRequireDefault(_get2);

var _getOr2 = require('./getOr');

var _getOr3 = _interopRequireDefault(_getOr2);

var _each2 = require('./each');

var _each3 = _interopRequireDefault(_each2);

var _join2 = require('./join');

var _join3 = _interopRequireDefault(_join2);

var _using2 = require('./using');

var _using3 = _interopRequireDefault(_using2);

var _concat2 = require('./concat');

var _concat3 = _interopRequireDefault(_concat2);

var _cast2 = require('./cast');

var _cast3 = _interopRequireDefault(_cast2);

var _shape2 = require('./shape');

var _shape3 = _interopRequireDefault(_shape2);

var _extend2 = require('./extend');

var _extend3 = _interopRequireDefault(_extend2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMapper = function createMapper(schema, cb) {
  return function (input) {
    var result = (0, _shape3.default)(schema, input);
    if ((0, _utils.isFunction)(cb)) {
      cb({ input: input, schema: schema, result: result });
    }
    return result;
  };
};

exports.default = createMapper;
var get = exports.get = _get3.default;
var getOr = exports.getOr = _getOr3.default;
var each = exports.each = _each3.default;
var join = exports.join = _join3.default;
var using = exports.using = _using3.default;
var concat = exports.concat = _concat3.default;
var cast = exports.cast = _cast3.default;
var extend = exports.extend = _extend3.default;
var shape = exports.shape = _shape3.default;