import * as Types from '../action-types/cartList'

export default function cartList(state = {}, action) {
  const { shopid, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock } = action.data
  switch (action.type) {
  case Types.ADD_CART:
  {
    const cart = JSON.parse(JSON.stringify(state))
    cart[shopid] = cart[shopid] || {}
    const shop = cart[shopid]
    shop[category_id] = shop[category_id] || {}
    const category = shop[category_id]
    category[item_id] = category[item_id] || {}
    const item = category[item_id]
    if (item[food_id]) {
      item[food_id].num++
    } else {
      item[food_id] = {
        num: 1,
        id: food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
      }
    }
    localStorage.setItem('buyCart', cart)
    return { ...cart }
  }
  case Types.REDUCE_CART:
  {
    const cart = JSON.parse(JSON.stringify(state))
    const shop = (cart[shopid] || {});
    const category = (shop[category_id] || {});
    const item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id].num > 0) {
        item[food_id].num--
        localStorage.setItem('buyCart', state.cartList)
      } else {
        item[food_id] = null
      }
    }
    return { ...cart }
  }
  // case Types.INIT_BUYCART:
  default:
    return state
  }
}
