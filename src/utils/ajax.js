const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'

class Ajax {
  constructor() {
    this.ajax = this.ajax.bind(this)
  }

  get(url, data) {
    return this.ajax(url, data)
  }

  post(url, data) {
    return this.ajax(url, data)
  }

  async ajax(url = '', data = {}, method = 'GET', type = 'fetch') {
    let realUrl = baseUrl + url
    if (method === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr = `${dataStr}${key}=${data[key]}&`
      })

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        realUrl = `${realUrl}?${dataStr}`
      }
    }

    if (window.fetch && type === 'fetch') {
      const requestConfig = {
        credentials: 'include',
        method,
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        mode: 'cors',
        cache: 'force-cache',
      }

      if (method === 'POST') {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(data),
        })
      }

      let response
      let result
      try {
        response = await fetch(realUrl, requestConfig)
        if (response.ok === false) {
          throw new Error(response.statusText)
        }
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
      try {
        result = await response.json()
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
      return result
    }

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      let sendData = ''
      if (method === 'POST') {
        sendData = JSON.stringify(data)
      }
      request.open(method, realUrl, true)
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      request.send(sendData)

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let res
            try {
              res = JSON.parse(request.response)
            } catch (e) {
              console.log(e)
              res = request.response
            }
            resolve(res)
          } else {
            reject(request)
          }
        }
      }
    })
  }
}

export default new Ajax()
