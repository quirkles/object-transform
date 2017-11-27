import { map, curry } from 'ramda'
import { isFunction } from './utils'

const handleSchemaKey = input => schemaVal => (isFunction(schemaVal) ? schemaVal(input) : schemaVal)

const shape = (schema, input) => map(handleSchemaKey(input), schema)

export default curry(shape)
