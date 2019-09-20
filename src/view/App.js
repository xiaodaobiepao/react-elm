import React, { Component } from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider, Spin } from 'antd'
import RouterIndex from '../routes/index'
import './App.less'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isReady: true,
    }
  }

  render() {
    const { isReady } = this.state
    return (
      <ConfigProvider locale={zhCN}>
        <div className="container">
          {
            isReady ? <RouterIndex /> : <div className="loading"><Spin size="large" /></div>
          }
        </div>
      </ConfigProvider>
    )
  }
}
