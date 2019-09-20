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