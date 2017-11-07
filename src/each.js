import {pipe, map, filter, T} from 'ramda'

import take from './take'

const each = (attr, filter_predicate = T) => {
  const take_attr_or_array = take(attr, [])
  return ({
    map: fn => pipe(take_attr_or_array, filter(filter_predicate), map(fn)),
    take: (...args) => pipe(take_attr_or_array, filter(filter_predicate), map(take(args))),
    where: predicate => each(attr, predicate),
  })
}

export default each