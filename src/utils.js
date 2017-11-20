import { flip, map, chain, filter, append, init, curry } from 'ramda'

export const fMap = flip(map)

export const fChain = flip(chain)

export const filterNulls = filter(Boolean)

export const arrWrap = obj => [].concat(obj)

export const replaceLast = curry((replacement, list) => (list.length ?
  append(replacement, init(list)) :
  list
))
