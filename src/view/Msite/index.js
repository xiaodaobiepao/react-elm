import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Head from '../../components/layout/head'

export default class Msite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geohash: '', // city页面传递过来的地址geohash
      msiteText: '请选择地址...', // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https: //fuss10.elemecdn.com',
    }
  }

  componentDidMount() {
    const { location } = this.props
    console.log(location)
  }

  render() {
    const { foodTypes, msiteText, geohash, imgBaseUrl } = this.state
    const search = (
      <Link to="/search/geohash" className="link_search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255, 255, 255)" strokeWidth="1" fill="none" />
          <line x1="14" y1="14" x2="20" y2="20" style={{ stroke: 'rgb(255, 255, 255)', strokeWidth: 2 }} />
        </svg>
      </Link>
    )

    const msiteTitle = (
      <Link to="/home" className="msite_title">
        <span className="title_text ellipsis">{msiteText}</span>
      </Link>
    )
    return (
      <div>
        <Head signinUp="msite" search={search} msiteTitle={msiteTitle} />
        <nav className="msite_nav">
          {
            foodTypes.length ? (
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {
                    foodTypes.map(item => (
                      <div className="swiper-slide food_types_container" key={item.id}>
                        {
                          item.map(foodItem => (
                            <Link to={`/food?geohash=${geohash}&title=${foodItem.title}&restaurant_category_id=${this.getCategoryId(foodItem.link)}`} key={foodItem.id} className="link_to_food">
                              <figure>
                                <img alt="食物" src={`${imgBaseUrl}${foodItem.image_url}`} />
                                <figcaption>{foodItem.title}</figcaption>
                              </figure>
                            </Link>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
                <div className="swiper-pagination" />
              </div>
            ) : <img alt="浮层" src="../../images/fl.svg" className="fl_back animation_opacity" />
          }
        </nav>
        <div className="shop_list_container">
          <header className="shop_header">
            <svg>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#shop" />
            </svg>
            <span className="shop_header_title">附近商家</span>
          </header>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

Msite.propTypes = {
  location: PropTypes.object,
}

Msite.defaultProps = {
  location: {},
}
