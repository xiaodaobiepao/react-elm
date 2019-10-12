import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cityGuess, getHotcity, getGroupcity } from '../../service/index'
import Head from '../../components/layout/head'
import './home.less'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guessCity: '', // 当前城市
      guessCityid: '', // 当前城市id
      hotcity: [], // 热门城市列表
      groupcity: {}, // 所有城市列表
    }
    // this.initCities = this.initCities.bind(this)
  }

  componentDidMount() {
    console.log('yiguazai')
    console.log(cityGuess)
    this.initCities()
  }

  initCities = () => {
    console.log(typeof cityGuess)
    cityGuess()
      .then(res => {
        console.log(res)
        this.setState({
          guessCity: res.cityInfo.name,
          guessCityid: res.cityInfo.id,
        })
      })
      .catch(console.log)

    getHotcity()
      .then(res => {
        this.setState({
          hotcity: res.cityInfo,
        })
      })
      .catch(console.log)

    getGroupcity()
      .then(res => {
        const sortobj = {}
        for (let i = 65; i <= 90; ++i) {
          if (res.cityInfo[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = res.cityInfo[String.fromCharCode(i)]
          }
        }
        this.setState({
          groupcity: sortobj,
        })
      })
      .catch(console.log)
  }

  reload() {
    window.location.reload()
  }

  render() {
    const { guessCityid, guessCity, hotcity, groupcity } = this.state
    const { history } = this.props
    const logo = (<span className="head_logo" role="button" tabIndex="0" onClick={() => this.reload()}>ele.me</span>)
    return (
      <div>
        <Head history={history} logo={logo} signinUp="home" />
        <nav className="city_nav">
          <div className="city_tip">
            <span>当前定位城市s：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <Link to={`/city/${guessCityid}`} className="guess_city">
            <span>{guessCity}</span>
            <svg className="arrow_right">
              <use {...{ xmlnsXlink: 'http://www.w3.org/1999/xlink', xlinkHref: '#arrow-right' }} />
            </svg>
          </Link>
        </nav>
        <section id="hot_city_container">
          <h4 className="city_title">热门城市</h4>
          <ul className="citylistul clear">
            {
              hotcity.map(item => <Link className="li" key={item.id} to={`/city/${item.id}`}>{item.name}</Link>)
            }
          </ul>
        </section>
        <section className="group_city_container">
          <ul className="letter_classify">
            {
              Object.entries(groupcity).map(([key, value], index) => (
                <li key={key} className="letter_classify_li">
                  <h4 className="city_title">
                    {key}
                    { index === 0 ? <span>（按字母排序）</span> : null }
                  </h4>
                  <ul className="groupcity_name_container citylistul clear">
                    {
                      value.map(item => <Link to={`/city/${item.id}`} key={item.id} className="ellipsis li">{item.name}</Link>)
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object,
}

Home.defaultProps = {
  history: {},
}
