import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

class Add_from extends Component {
  PropTypes = {
    setForm: PropTypes.func.isRequired,
    categroys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categroys, parentId } = this.props
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(<Select>
              <Option value="0">一级分类</Option>
              {
                categroys.map((ele) => <Option value={ele._id} key={ele._id}>{ele.name}</Option>
                )
              }
            </Select>)
          }
        </Item>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: "",
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

export default Form.create()(Add_from)
