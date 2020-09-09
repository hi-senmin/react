import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'
import { getFileItem } from 'antd/lib/upload/utils'

const Item = Form.Item


class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form >
          <Item label="角色名称" {...formItemLayout}>
            {
              getFieldDecorator('roleName', {
                initialValue: '',
                rules: [{ required: true, message: '角色名称必须输入' }]
              })(<Input placeholder="请输入角色名称"></Input>)
            }
          </Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(AddForm)