import { pipe, reduce, head, tail, pathOr } from 'ramda'

const is_truthy = val => !!val

const get_values = attrs => input => attrs.map(attr => pathOr(null, attr.split('.'), input)).filter(is_truthy)

const str_concat_with = separator => (acc, value) => `${acc}${separator}${value}`

const concat_with = separator => parts => reduce(str_concat_with(separator), head(parts), tail(parts))

const concat = (attrs = [], separator = ' ') => pipe(get_values(attrs), concat_with(separator))

export default concat
