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

    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  componentWillMount() {
    // 所有的树形结构
    this.treeNodes = this.getTreeNodes(menuList)
  }

  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
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

  // 父组件获取
  getMenus = () => this.state.checkedKeys

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state


    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>

      </div>
    )
  }
}
export default AuthForm