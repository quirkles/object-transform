import { pipe, reduce, T, filter, zip, map, curry, append, chain, __ } from 'ramda'

import { arrWrap, filterNulls, replaceLast } from './utils'
import get from './get'
import join from './join'
import { shape } from './index'

const getAttrAndFilter = ([attr, p]) => pipe(arrWrap, chain(get(attr)), filterNulls, filter(p))

const getItems = (attrPath = [], predicates = [T]) => reduce(
  (result, fn) => fn(result),
  __,
  map(getAttrAndFilter, zip(attrPath, predicates)),
)

const each = (attr = [], predicates = [T]) => {
  const attrPath = arrWrap(attr)
  return ({
    map: fn => pipe(getItems(attrPath, predicates), map(fn)),
    get: _attr => pipe(getItems(attrPath, predicates), map(get(_attr))),
    join: (toJoin, separator = ' ') => pipe(getItems(attrPath, predicates), map(join(toJoin, separator))),
    where: predicate => each(attrPath, replaceLast(predicate, predicates)),
    shape: schema => pipe(getItems(attrPath, predicates), map(shape(schema))),
    each: nestedAttr => each(append(nestedAttr, attrPath), append(T, predicates)),
  })
}

export default each
