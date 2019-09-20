import { combineReducers } from 'redux'
import address from './address'
import userInfo from './userInfo'

export default combineReducers({
  address,
  userInfo,
})
