import { applyTo, pipe } from 'ramda'
import { fChain } from './utils'

export default (...fns) => pipe(applyTo, fChain(fns))
