import { map } from 'ramda'
import { isFunction } from './utils'

import _get from './get'
import _each from './each'
import _join from './join'
import _using from './using'
import _concat from './concat'
import _cast from './cast'

const handleSchemaKey = input => schemaVal => (isFunction(schemaVal) ? schemaVal(input) : schemaVal)

const createMapper = (schema, cb) => (input) => {
  const result = map(handleSchemaKey(input), schema)
  if (isFunction(cb)) {
    cb({ input, schema, result })
  }
  return result
}

export default createMapper

export const get = _get
export const each = _each
export const join = _join
export const using = _using
export const concat = _concat
export const cast = _cast
export const shape = createMapper
