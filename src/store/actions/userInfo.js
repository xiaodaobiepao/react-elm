import * as Types from '../action-types/userInfo'

export function recordUserInfo(data) {
  return {
    type: Types.RECORD_USERINFO,
    data,
  }
}

export function getUserInfo(data) {
  return {
    type: Types.GET_USERINFO,
    data,
  }
}
