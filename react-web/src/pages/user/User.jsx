import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Divider,
} from 'antd'
import { formateDate } from '../../utils/dateTime'
import UserForm from './UserForm'

import { reqUsers, reqUpdateUser, reqAddUser, reqDeleteUser } from '../../api/index'

export class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isShow: false,
      users: [],
      rolesNames: {}
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.reqUsers()
  }

  showUpdate = (user) => {
    this.setState({
      isShow: true,
      user
    })
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.state.rolesNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span >
            <b onClick={() => this.showUpdate(user)} className="ant-dropdown-link">修改</b>
            <Divider type="vertical" />
            <b onClick={() => this.deleteUser(user)} className="ant-dropdown-link">删除</b>
          </span>
        )
      },
    ]
  }

  rolesName = (rolesName) => {
    return rolesName.reduce((pre, item) => {
      pre[item._id] = item.name
      return pre
    }, {})
  }

  reqUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      const rolesNames = this.rolesName(roles)
      this.setState({
        users,
        roles,
        rolesNames
      })
    }
  }

  addOrUpdateUser = async () => {
    const { user } = this.state
    this.form.validateFields(async (err, val) => {
      if (!err) {
        const userData = this.form.getFieldsValue()
        userData._id = user._id
        console.log('userData', userData)

        const res = userData._id ? await reqUpdateUser(userData) : await reqAddUser(userData)

        if (res.status === 0) {
          message.success(user._id ? '修改成功' : '新增成功')

          await this.reqUsers()
          this.form.resetFields()
          this.setState({ isShow: false })
        } else {
          message.error(res.msg || '操作失败')
        }

      } else {
        message.error(user._id ? '修改失败' : '新增失败')
      }
    })
  }

  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const res = await reqDeleteUser(user._id)
        if (res.status === 0) {
          this.reqUsers()
          message.success('删除成功')
        } else {
          message.error(res.msg)
        }
      }
    })
  }

  render() {
    const { users, isShow, roles = [], user = {} } = this.state

    const title = (<Button type='primary' onClick={() => this.showUpdate({})}>创建用户</Button>);

    return (
      <div style={{ 'height': '100%' }}>
        <Card title={title}>
          <Table style={{ 'height': '100%' }}
            rowKey='_id'
            bordered
            dataSource={users}
            columns={this.columns}
          >
          </Table>

          <Modal
            title={user._id ? '修改用户' : '新增用户'}
            visible={isShow}
            onOk={this.addOrUpdateUser}
            onCancel={() => {
              this.setState({ isShow: false })
              this.form.resetFields()
            }}
          >
            <UserForm
              setForm={form => this.form = form}
              user={user}
              roles={roles}
            ></UserForm>
          </Modal>

        </Card>
      </div>
    )
  }
}

export default User
