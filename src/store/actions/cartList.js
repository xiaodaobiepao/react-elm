import * as Types from '../action-types/cartList'

export function add_cart (info) {
  return {
    type: Types.ADD_CART,
    data: info
  }
}

export function reduce_cart (info) {
  return {
    type: Types.REDUCE_CART,
    data: info
  }
}