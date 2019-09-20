import { createStore } from 'redux'
import reducers from './reducers'

export default function createInitStore(initState) {
  console.table(reducers.toString())
  return createStore(reducers, initState,
    window.devToolsExtension ? window.devToolsExtension() : undefined)
}
