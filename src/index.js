import { isFunction } from './utils'

import _get from './get'
import _getOr from './getOr'
import _each from './each'
import _join from './join'
import _using from './using'
import _concat from './concat'
import _cast from './cast'
import _shape from './shape'
import _extend from './extend'

const createMapper = (schema, cb) => (input) => {
  const result = _shape(schema, input)
  if (isFunction(cb)) {
    cb({ input, schema, result })
  }
  return result
}

export default createMapper

export const get = _get
export const getOr = _getOr
export const each = _each
export const join = _join
export const using = _using
export const concat = _concat
export const cast = _cast
export const extend = _extend
export const shape = _shape
