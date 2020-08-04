import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/dateTime'
import { reqWeather } from '../../api/index'
import memoryUtil from "../../utils/memoryUtil";
import storege from "../../utils/storege";
import menuList from '../../config/menuConfig'
import './index.css'
import LinkButton from '../link-button'
import { Modal } from 'antd';

const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: '',
    title: ''
  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      let currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getWeather = async () => {
    let res = await reqWeather('广州')
    let { dayPictureUrl, weather } = res[0].weather_data[0]
    this.setState({ dayPictureUrl, weather })
  }
  getTitle = () => {
    let title
    let path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        let cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  loginOut = () => {
    confirm({
      title: '是否确认退出',
      content: '',
      maskClosable: true,
      onOk: () => {
        storege.removeUser()
        memoryUtil.user = {}
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    let title = this.getTitle()
    const user = memoryUtil.user.username
    return (
      <div className="header">
        <div className="header_top">
          <span>hello {user}</span>
          <LinkButton onClick={this.loginOut}>退出</LinkButton>
        </div>
        <div className="header_bottom">
          <div className="bottom_left">
            {title}
          </div>
          <div className="bottom_right">
            <span>{this.state.currentTime}</span>
            <img src={this.state.dayPictureUrl} alt="" width='30px' />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
