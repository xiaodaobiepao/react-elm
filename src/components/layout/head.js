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
    console.log(history)
    return (
      <header className="head_top">
        { logo }
        { search }
        {
          goBack ? (
            <section className="back" onClick={() => { history.go(-1) }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 33" className="back-svg"><path fillRule="evenodd" d="M17.655 1.853L15.961.159.033 16.072 15.961 32l1.694-1.694L3.429 16.08 17.655 1.854z" className="path1" data-spm-anchor-id="a2ogi.13147251.0.i3" /></svg>
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
