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

export class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isShow: false,
      users: [
        {
          "_id": "5cb05b4db6ed8c44f42c9af2",
          "username": "test",
          "password": "202cb962ac59075b964b07152d234b70",
          "phone": "123412342134",
          "email": "sd",
          "role_id": "5ca9eaa1b49ef916541160d3",
          "create_time": 1555061581734,
          "__v": 0
        },
      ]
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShow: true
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
      },
      {
        title: '操作',
        render: (user) => (
          <span >
            <b onClick={() => this.showUpdate(user)} className="ant-dropdown-link">修改</b>
            <Divider type="vertical" />
            <b className="ant-dropdown-link">删除</b>
          </span>
        )
      },
    ]
  }

  render() {
    const { users, isShow } = this.state

    const user = this.user || {}

    const roles = this.roles || [
      {_id:1, name: '测试一下'}
    ]

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
            onCancel={() => {
              this.setState({ isShow: false })
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
