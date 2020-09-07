import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    // roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    const { getFieldDecorator } = this.props.form
    const { roles, user } = this.props

    return (
      <div>
        <Form {...formItemLayout}>
          <Item label='用户名'>
            {
              getFieldDecorator('username', {
                initialValue: user.username,
              })(
                <Input placeholder='请输入用户名' />
              )
            }
          </Item>

          <Item label='手机号'>
            {
              getFieldDecorator('phone', {
                initialValue: user.phone,
              })(
                <Input placeholder='请输入手机号' />
              )
            }
          </Item>

          <Item label='邮箱'>
            {
              getFieldDecorator('email', {
                initialValue: user.email,
              })(
                <Input placeholder='请输入邮箱' />
              )
            }
          </Item>

          <Item label='角色'>
            {
              getFieldDecorator('role_id', {
                initialValue: user.role_id,
              })(
                <Select>
                  {
                    roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>
        </Form>
      </div>
    )

  }
}

export default Form.create()(UserForm)