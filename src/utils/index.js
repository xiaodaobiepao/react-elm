export function merge(...configs) {
  let obj = {}
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
      urlObj[item[0]] = item[1]
    })
    return urlObj
  }
  url.slice(1).split('&').forEach(item => {
    const key = item.split('=')[0]
    const val = item.split('=')[1]
    urlObj[key] = val
  })
  return urlObj
}