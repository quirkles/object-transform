'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _utils = require('./utils');

var _get2 = require('./get');

var _get3 = _interopRequireDefault(_get2);

var _join2 = require('./join');

var _join3 = _interopRequireDefault(_join2);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAttrAndFilter = function getAttrAndFilter(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      attr = _ref2[0],
      p = _ref2[1];

  return (0, _ramda.pipe)(_utils.arrWrap, (0, _ramda.chain)((0, _get3.default)(attr, [])), _utils.filterNulls, (0, _ramda.filter)(p));
};

var getItems = function getItems() {
  var attrPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var predicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_ramda.T];
  return (0, _ramda.reduce)(function (result, fn) {
    return fn(result);
  }, _ramda.__, (0, _ramda.map)(getAttrAndFilter, (0, _ramda.zip)(attrPath, predicates)));
};

var _each = function _each() {
  var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var predicates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_ramda.T];

  var attrPath = (0, _utils.arrWrap)(attr);
  return {
    map: function map(fn) {
      return (0, _ramda.pipe)(getItems(attrPath, predicates), (0, _ramda.map)(fn));
    },
    get: function get(_attr) {
      return (0, _ramda.pipe)(getItems(attrPath, predicates), (0, _ramda.map)((0, _get3.default)(_attr)));
    },
    join: function join(toJoin) {
      var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
      return (0, _ramda.pipe)(getItems(attrPath, predicates), (0, _ramda.map)((0, _join3.default)(toJoin, separator)));
    },
    where: function where(predicate) {
      return _each(attrPath, (0, _utils.replaceLast)(predicate, predicates));
    },
    shape: function shape(schema) {
      return (0, _ramda.pipe)(getItems(attrPath, predicates), (0, _ramda.map)((0, _index.shape)(schema)));
    },
    each: function each(nestedAttr) {
      return _each((0, _ramda.append)(nestedAttr, attrPath), (0, _ramda.append)(_ramda.T, predicates));
    }
  };
};

exports.default = _each;