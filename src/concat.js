import { pipe, reduce, pick, values, head, tail } from 'ramda'

const str_concat_with = separator => (acc, value) => `${acc}${separator}${value}`

const concat_with = separator => values => reduce(str_concat_with(separator), head(values), tail(values))

const concat = (attrs = [], separator=' ') => pipe(pick(attrs), values, concat_with(separator))

export default concat