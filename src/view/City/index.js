import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Form, Input } from 'antd'
import Head from '../../components/layout/head'
import { getCurrentCity, searchplace } from '../../service'
import './city.less'

export default class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '', // 搜索地址
      cityname: '', // 当前城市名字
      cityid: '', // 当前城市id
      placeList: [], // 搜索城市列表
      historyTitle: true, // 显示搜索历史头部
      placeNone: false,
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { cityid } = match.params
    getCurrentCity(cityid)
      .then(res => {
        this.setState({
          cityid,
          cityname: res.cityInfo.name,
        })
      })
    this.initData()
  }

  searchChange = e => {
    console.log('hehe')
    console.log(e.target.value)
    this.setState({
      searchValue: e.target.value,
    })
    this.postpois(e.target.value)
  }

  initData = () => {
    const placeHistory = localStorage.getItem('placeHistory')
    if (placeHistory) {
      this.setState({
        placeList: JSON.parse(placeHistory),
      })
    } else {
      this.setState({
        placeList: [],
      })
    }
  }

  postpois = val => {
    if (val) {
      const { cityid } = this.state
      searchplace(cityid, val)
        .then(res => {
          this.setState({
            historyTitle: false,
            placeList: res.placeList,
            placeNone: !res.placeList.length,
          })
        })
    } else {
      this.setState({
        placeNone: false,
      })
    }
  }

  nextpage = (index, geohash) => {
    const historyItem = localStorage.getItem('placeHistory')
    const { placeList } = this.state
    const choosePlace = placeList[index]
    let placeHistory = []
    if (historyItem) {
      placeHistory = JSON.parse(historyItem)
      const placeIndex = placeHistory.findIndex(item => item.geohash === geohash)
      if (placeIndex === -1) {
        placeHistory.push(choosePlace)
      }
    } else {
      placeHistory.push(choosePlace)
    }
    localStorage.setItem('placeHistory', JSON.stringify(placeHistory))
    const { history } = this.props
    history.push(`/msite?geohash=${geohash}`)
  }

  clearAll = () => {
    localStorage.removeItem('placeHistory')
    this.initData()
  }

  render() {
    const changecity = <Link to="/home" className="change_city">切换城市</Link>
    const { searchValue, cityname, placeList, placeNone } = this.state
    const { history } = this.props
    const label = (
      <Link to="/home" className="label">
        <span className="label_text">上海</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" className="arrow"><path fill="#333" fillRule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z" data-spm-anchor-id="a2ogi.13147251.0.i4" /></svg>
      </Link>
    )
    // const formItemLayout = {
    //   labelCol: { xs: { span: 4 } },
    //   wrapperCol: { xs: { span: 20 } },
    // }
    return (
      <div className="city_container">
        <Head history={history} changecity={changecity} head-title={cityname} goBack />
        <Form labelCol={{ xs: { span: 4 } }} wrapperCol={{ xs: { span: 20 } }} className="form_search">
          <Form.Item label={label}>
            <Input.Search value={searchValue} onChange={this.searchChange} type="search" defaultValue="请输入地址" className="city_input input_style"></Input.Search>
          </Form.Item>
        </Form>
        { this.historyTitle ? (<header className="pois_search_history">搜索历史</header>) : null }
        <ul className="getpois_ul">
          {
            placeList.map((item, index) => (
              <li onClick={() => { this.nextpage(index, item.geohash) }} key={item.latitude}>
                <h4 className="pois_name ellipsis">{item.name}</h4>
                <p className="pois_address ellipsis">{item.address}</p>
              </li>
            ))
          }
        </ul>
        { this.historyTitle && placeList.length ? <footer className="clear_all_history" onClick={this.clearAll}>清空所有</footer> : null }
        { placeNone ? (
          <div className="search_none_place">
            <div className="search_box">
              <img alt="没有结果" src="//cube.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif" />
              <h3>没有搜索结果</h3>
              <p>换个关键字试试</p>
            </div>
          </div>
        ) : null }
      </div>
    )
  }
}

City.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}

City.defaultProps = {
  match: {},
  history: {},
}
