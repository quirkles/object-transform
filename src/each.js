import {pipe, map, filter} from 'ramda'

import take from './take'

const each = (attr, filter_predicate = () => true) => {
  const take_attr_or_array = take(attr, [])
  return ({
    do: fn => pipe(take_attr_or_array, filter(filter_predicate), map(fn)),
    take: (...args) => pipe(take_attr_or_array, filter(filter_predicate), map(take(args))),
    where: predicate => each(attr, predicate)
  })
}

export default each