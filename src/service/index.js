import ajax from '../utils/ajax'

function httpwrap(promiseObj) {
  return new Promise((resolve, reject) => {
    promiseObj.then(res => {
      if (res.status === 'success') {
        resolve(res)
      } else {
        reject(res.errMsg)
      }
    })
  })
}

export const getUser = () => httpwrap(ajax.get('/v1/user', { user_id: localStorage.getItem('user_id') || '' }))
export const cityGuess = () => httpwrap(ajax.get('/v1/cities', { type: 'guess' }))
export const getHotcity = () => httpwrap(ajax.get('/v1/cities', { type: 'hot' }))
export const getGroupcity = () => httpwrap(ajax.get('/v1/cities', { type: 'group' }))
export const getCurrentCity = number => httpwrap(ajax.get(`/v1/cities/${number}`))
export const searchplace = (cityId, value, type = 'search') => httpwrap(ajax.get('/v1/pois', { type, city_id: cityId, keyword: value }))
