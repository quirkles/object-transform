'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _utils = require('./utils');

var handleSchemaKey = function handleSchemaKey(input) {
  return function (schemaVal) {
    return (0, _utils.isFunction)(schemaVal) ? schemaVal(input) : schemaVal;
  };
};

var shape = function shape(schema, input) {
  return (0, _ramda.map)(handleSchemaKey(input), schema);
};

exports.default = (0, _ramda.curry)(shape);