import { map, applyTo } from "ramda"
import _take from './take'
import _each from './each'
import _concat from './concat'

const create_mapper = schema => input => map(applyTo(input), schema)

export default create_mapper

export const take = _take
export const each = _each
export const concat = _concat