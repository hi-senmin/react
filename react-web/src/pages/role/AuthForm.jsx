import React, { Component } from 'react'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

import {
  Form,
  Input,
  Tree
} from 'antd'

const Item = Form.Item
const { TreeNode } = Tree;

class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object
  }
  constructor(props) {
    super(props)

    // 根据传入角色的menus生成初始状态
    // const { menus } = this.props.role
    // this.state = {
    //   checkedKeys: menus
    // }
  }

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  render() {
    const { role } = this.props

    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>

      </div>
    )
  }
}
export default Form.create()(AuthForm)