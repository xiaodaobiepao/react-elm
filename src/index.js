import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import FastClick from 'fastclick'
import 'antd/dist/antd.css'
import './index.less'
import './utils/rem'
import App from './view/App'
import createInitStore from './store'
const store = createInitStore()

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
