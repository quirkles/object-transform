import { split, pathOr } from 'ramda'

export default (attr = '', fallback = null) => pathOr(fallback, split('.', attr))
