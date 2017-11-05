import { propOr } from 'ramda'

const take = (attr, fallback=null) => propOr(fallback, attr)

export default take