import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'
import { getUserInfo } from '../../store/actions/userInfo'
import { getUser } from '../../service/index'
import './head.less'

const mapStateToProps = state => ({
  userInfo: state.userInfo,
})

const mapDispatchToProps = dispatch => ({
  getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
})

class Head extends Component {
  constructor(props) {
    super(props)
    this.getUserInfo = this.getUserInfo.bind(this)
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo() {
    const { getUserInfoAction } = this.props
    console.log(getUserInfoAction)
    getUser()
      .then(res => {
        console.log(res)
        getUserInfoAction({ userInfo: res.userInfo })
      })
      .catch(err => {
        getUserInfoAction({ userInfo: null })
        message.error(err)
      })
  }

  render() {
    const { logo, search, signinUp, headTitle, goBack, edit, msiteTitle, changecity, changeLogin, history, userInfo } = this.props
    console.log(userInfo.userInfo)
    return (
      <header className="head_top">
        { logo }
        { search }
        {
          goBack ? (
            <section className="back" onClick={() => { history.go(-1) }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style={{ fill: 'none', stroke: 'rgb(255,255,255)', strokeWidth: 2 }} />
              </svg>
            </section>
          ) : null
        }
        {
          signinUp ? (
            <Link className="head_login" to={userInfo.userInfo ? '/profile' : '/login'}>
              {
                userInfo.userInfo ? (
                  <svg className="user_avatar"><use {...{ xmlnsXlink: 'http://www.w3.org/1999/xlink', xlinkHref: '#user' }} /></svg>
                ) : <span className="login_span">登录|注册</span>
              }
            </Link>
          ) : null
        }
        {
          headTitle ? (
            <section className="title_head ellipsis">
              <span className="title_text">{headTitle}</span>
            </section>
          ) : null
        }
        { edit }
        { msiteTitle }
        { changecity }
        { changeLogin }
      </header>
    )
  }
}

Head.propTypes = {
  logo: PropTypes.element,
  search: PropTypes.element,
  signinUp: PropTypes.string,
  headTitle: PropTypes.string,
  goBack: PropTypes.bool,
  edit: PropTypes.element,
  msiteTitle: PropTypes.element,
  changecity: PropTypes.element,
  changeLogin: PropTypes.element,
  history: PropTypes.object,
  userInfo: PropTypes.object,
  getUserInfoAction: PropTypes.func,
}

Head.defaultProps = {
  logo: null,
  search: null,
  signinUp: '',
  headTitle: '',
  goBack: false,
  edit: null,
  msiteTitle: null,
  changeLogin: null,
  changecity: null,
  history: {},
  userInfo: {},
  getUserInfoAction: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(Head)
