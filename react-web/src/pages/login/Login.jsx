import React, { Component } from 'react'
import './less/login.css'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'



import logo from '../../assets/img/logo.jpg'
import { reqLogin } from '../../api/index'
import memoryUtil from "../../utils/memoryUtil";
import storege from '../../utils/storege'
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 通过验证
        const { userName, password } = values
        let res = await reqLogin(userName, password)
        console.log(res)
        if (res.status === 0) {
          message.success('登录成功')
          memoryUtil.user = res.data
          storege.saveUser(res.data)
          this.props.history.push('/')
        } else {
          message.error(res.msg)
        }
      }
    })
  }

  render() {
    const user = memoryUtil.user
    if (user && user._id) {
      return <Redirect to='/'></Redirect>
    }

    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React后台管理平台</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }, { min: 4, message: '至少4位数' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const LoginWrap = Form.create()(Login)
export default LoginWrap
