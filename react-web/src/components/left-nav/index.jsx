import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from '../../assets/img/logo.jpg'
import menuList from '../../config/menuConfig'

import { Menu, Icon } from 'antd';


const { SubMenu } = Menu;
export class leftNav extends Component {

  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        const citem = item.children.find((citem) => path.indexOf(citem.key) === 0)
        // console.log(item.children)
        if (citem) {
          this.openKey = item.key
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    const path = this.props.location.pathname
    return (
      <div className="left_nav">
        <Link to="home">
          <header>
            <img src={logo} alt="" width="50px" />
            <h1>辣辣 react</h1>
          </header>
        </Link>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>

      </div>
    )
  }

}

export default withRouter(leftNav)
