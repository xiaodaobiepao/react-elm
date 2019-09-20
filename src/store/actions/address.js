import * as Types  from '../action-types/address'

export function record (latitude, longitude) {
  return {
    type: Types.RECORD_ADDRESS,
    data: {
      latitude,
      longitude
    }
  }
}

export function show (detail) {
  return {
    type: Types.RECORD_SHOPDETAIL,
    data: detail
  }
}