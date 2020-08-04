import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Form, Input } from 'antd'

const Item = Form.Item

class Update_from extends Component {
  PropTypes = {
    categroyName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categroyName } = this.props
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: categroyName.name,
            rules: [
              { required: true, message: 'required' }
            ]
          })(
            <Input placeholder="请输入分类" autoComplete="off" />
          )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(Update_from)
