import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Form, Input } from 'antd'
import Head from '../../components/layout/head'
import { getCurrentCity, searchplace } from '../../service'

export default class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '', // 搜索地址
      cityname: '', // 当前城市名字
      cityid: '', // 当前城市id
      placeList: [], // 搜索城市列表
      placeHistory: [], // 历史搜索记录
      historyTitle: true, // 显示搜索历史头部
    }
  }

  componentDidMount() {
    const { match } = this.props
    const cityid = match.params.cityid
    getCurrentCity(cityid)
      .then(res => {
        this.setState({
          cityid,
          cityname: res.name
        })
      })
    this.initData()
  }

  searchChange = e => {
    console.log(e)
    this.setState({
      searchValue: e.detail.value,
    })
    this.postpois(e.detail.value)
  }

  initData = () => {
    const placeHistory = localStorage.getItem('placeHistory')
    if (placeHistory) {
      this.setState({
        placeList: JSON.parse(placeHistory)
      })
    } else {
      this.setState({
        placeList: []
      })
    }
  }

  postpois = val => {
    if (val) {
      searchplace(this.cityid, val)
        .then(res => {
          this.historyTitle = false
          this.placeList = res.placeList
        })
    }
  }

  render() {
    const changecity = <Link to="/home" className="change_city">切换城市</Link>
    const { searchValue, cityname } = this.state
    return (
      <div className="city_container">
        <Head changecity={changecity} head-title={cityname} goBack />
        <Form>
          <Form.Item>
            <Input.Search value={searchValue} onChange={this.searchChange} type="search" defaultValue="输入学校、商务楼、地址" className="city_input input_style"></Input.Search>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

City.propTypes = {
  match: PropTypes.object,
}
