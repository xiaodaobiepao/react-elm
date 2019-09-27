export function merge(...configs) {
  const obj = {}
  function assignValue(key, val) {
    if (typeof obj[key] === 'object' && typeof val === 'object') {
      obj[key] = merge(obj[key], val)
    } else {
      obj[key] = val
    }
  }
  for (let i = 0, l = configs.length; i < l; ++i) {
    Object.keys(configs[i]).forEach(key => {
      assignValue(key, configs[i][key])
    })
  }
}

export function parseSearch(url) {
  const urlObj = {}
  if (window.URLSearchParams) {
    const urlQuery = new URLSearchParams(url)
    Array.from(urlQuery.entries).forEach(item => {
      const [key, val] = item
      urlObj[key] = val
    })
    return urlObj
  }
  url.slice(1).split('&').forEach(item => {
    const [key, val] = item.split('=')
    urlObj[key] = val
  })
  return urlObj
}
