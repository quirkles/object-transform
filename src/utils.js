import { flip, map, chain, filter, append, init, curry, cond, equals, always, T } from 'ramda'

export const fMap = flip(map)

export const isFunction = obj => typeof obj === 'function'

export const fChain = flip(chain)

export const filterNulls = filter(Boolean)

export const doIfNotNull = fn => cond([[equals(null), always(null)], [T, fn]])

export const doIfNotEmpty = fn => cond([[equals([]), always(null)], [T, fn]])

export const arrWrap = obj => [].concat(obj)

export const replaceLast = curry((replacement, list) => (list.length ?
  append(replacement, init(list)) :
  list
))
