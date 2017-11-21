'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceLast = exports.arrWrap = exports.doIfNotEmpty = exports.doIfNotNull = exports.filterNulls = exports.fChain = exports.isFunction = exports.fMap = undefined;

var _ramda = require('ramda');

var fMap = exports.fMap = (0, _ramda.flip)(_ramda.map);

var isFunction = exports.isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var fChain = exports.fChain = (0, _ramda.flip)(_ramda.chain);

var filterNulls = exports.filterNulls = (0, _ramda.filter)(Boolean);

var doIfNotNull = exports.doIfNotNull = function doIfNotNull(fn) {
  return (0, _ramda.cond)([[(0, _ramda.equals)(null), (0, _ramda.always)(null)], [_ramda.T, fn]]);
};

var doIfNotEmpty = exports.doIfNotEmpty = function doIfNotEmpty(fn) {
  return (0, _ramda.cond)([[(0, _ramda.equals)([]), (0, _ramda.always)(null)], [_ramda.T, fn]]);
};

var arrWrap = exports.arrWrap = function arrWrap(obj) {
  return [].concat(obj);
};

var replaceLast = exports.replaceLast = (0, _ramda.curry)(function (replacement, list) {
  return list.length ? (0, _ramda.append)(replacement, (0, _ramda.init)(list)) : list;
});