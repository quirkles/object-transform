import { split, pathOr, curry } from 'ramda'

const getOr = (fallback, attr, input) => pathOr(fallback, split('.', attr), input)

const curriedGetOr = curry(getOr)

export default curriedGetOr
