import { pipe } from 'ramda'
import get from '../src/get'

export default (attr = '') => ({
  asString: pipe(get(attr), String),
  asNumber: pipe(get(attr), Number),
  asBool: pipe(get(attr), Boolean),
})