import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './admin.less'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import memoryUtil from "../../utils/memoryUtil";
import { Route, Switch } from 'react-router-dom'


import Home from '../home/Home'
import Category from '../categroy/Categroy'
import Product from '../product/Product'
import User from '../user/User'
import Role from '../role/Role'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'

const { Footer, Sider, Content } = Layout;
export class Admin extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const user = memoryUtil.user
    if (!user || !user._id) {
      return <Redirect to='/login'></Redirect>
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider collapsible={true} trigger={null} collapsed={this.state.collapsed}>
          <LeftNav />
          <div className='toggle_change' onClick={() => this.toggle()}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
            })}
          </div>
        </Sider>
        <Layout>
          <Header>

          </Header>
          <Content style={{ backgroundColor: '#fff', margin: '20px 20px 0', overflowY: 'scroll', overflowX: 'hidden' }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />

              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>Hello world 辣辣的 react app</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
