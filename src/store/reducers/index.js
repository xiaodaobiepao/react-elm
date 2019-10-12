import { combineReducers } from 'redux'
import address from './address'
import userInfo from './userInfo'
import cartList from './cartList';

export default combineReducers({
  address,
  userInfo,
  cartList,
})
