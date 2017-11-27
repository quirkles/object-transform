import { pipe, reduce, T, filter, zip, map, append, chain, __ } from 'ramda'

import { arrWrap, filterNulls, replaceLast } from './utils'
import get from './get'
import getOr from './getOr'
import join from './join'
import { shape } from './index'

const getAttrAndFilter = ([attr, predicate]) => pipe(
  arrWrap,
  chain(getOr([], attr)),
  filterNulls, filter(predicate),
)

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
    join: (separator = '', toJoin) => pipe(getItems(attrPath, predicates), map(join(separator, toJoin))),
    where: predicate => each(attrPath, replaceLast(predicate, predicates)),
    shape: schema => pipe(getItems(attrPath, predicates), map(shape(schema))),
    each: nestedAttr => each(append(nestedAttr, attrPath), append(T, predicates)),
  })
}

export default each
