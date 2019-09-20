(function rem(doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    const { clientWidth } = docEl
    if (!clientWidth) return
    docEl.style.fontSize = `${20 * (clientWidth / 320)}px`
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window))
