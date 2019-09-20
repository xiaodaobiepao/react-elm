import * as Types from '../action-types/address'

const initState = []
export default function address(state = initState, action) {
  switch (action.type) {
  case Types.RECORD_ADDRESS:
    // 记录地址
    return action.data
  default:
    return state
  }
}
