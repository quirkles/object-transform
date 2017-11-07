import { mapObjIndexed, propOr } from 'ramda'
import _take from './take'
import _each from './each'
import _concat from './concat'
import _same from './same'
import _from_schema from './from_schema'

const bind_input_to_key_handler = input => (value, key) => {
  if (propOr(false, 'is_object_mapper_take_same_operator', value)) {
    return propOr(value.default_value, key, input)
  }
  return value(input)
}

const create_mapper = schema => (input) => {
  const handle_schema_key = bind_input_to_key_handler(input)
  return mapObjIndexed(handle_schema_key, schema)
}

export default create_mapper

export const take = _take
export const each = _each
export const concat = _concat
export const same = _same
export const from_schema = _from_schema
