import * as Types from '../action-types/userInfo'

const initState = {}
export default function userInfo(state = initState, action) {
  const { data } = action
  switch (action.type) {
  case (Types.GET_USERINFO):
    if (state.userInfo && (state.userInfo.username !== data.userInfo.username)) {
      return state
    }
    if (!state.login) {
      return state
    }
    return { ...state, userInfo: data.userInfo }
  default:
    return state
  }
}
