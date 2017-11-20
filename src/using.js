import { pipe } from 'ramda'
import get from './get'
import { shape } from '../src/index'

const using = (attr = '') => ({
  get: target => get(`${attr}.${target}`),
  do: fn => pipe(get(attr), fn),
  using: nestedAttr => using(`${attr}.${nestedAttr}`),
  shape: schema => pipe(get(attr), shape(schema)),
})

export default using
