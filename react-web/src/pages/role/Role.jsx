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

import AddForm from './AddForm'
import AuthForm from './AuthForm'
export class Role extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roles: [{
        '_id': "5ca9eaa1b49ef916541160d3",
        'auth_name': "test007",
        'auth_time': 1558679920395,
        'create_time': 1554639521749,
        'menus': [],
        'name': "测试",
      }, {
        '_id': "5ca9eaa1b49ef916541160d6",
        'auth_name': "test001",
        'auth_time': 1558679920391,
        'create_time': 1554639521742,
        'menus': [],
        'name': "测试2",
      }],
      role: {}, // 
      isShowAdd: false, // 
      isShowAuth: false
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  initColumns = () => {
    this.columns = [{
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: create_time => formateDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formateDate
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    }]
  }

  onRow = (role) => {
    return {
      onClick: event => {
        console.log('click row', role)
        this.setState({ role })
      }
    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const { roleName } = values

        let role = {
          _id: Date.now(),
          auth_name: "test002",
          auth_time: Date.now(),
          create_time: Date.now(),
          menus: [],
          name: values.roleName,
        }
        this.setState(state => ({
          roles: [...state.roles, role]
        }))

        this.setState({ isShowAdd: false })
        this.form.resetFields()
      } else {
        message.error('添加失败')
      }
    })
  }

  authRole = () => {

  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (<div>
      <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>
      <Button
        type="primary"
        disabled={!role._id}
        style={{ margin: '0 10px' }}
        onClick={() => this.setState({ isShowAuth: true })}
      >设置用户权限</Button>
    </div>
    )
    console.log(isShowAdd)

    return (
      <div style={{ 'height': '100%' }}>
        <Card title={title}>
          <Table style={{ 'height': '100%' }}
            rowKey='_id'
            bordered
            dataSource={roles}
            columns={this.columns}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [role._id],
              onSelect: role => { this.setState({ role }) }
            }}
            onRow={this.onRow}
          >
          </Table>

          <Modal
            title='添加角色'
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({ isShowAdd: false })
              this.form.resetFields()
            }}
          >
            <AddForm setForm={form => (this.form = form)}></AddForm>
          </Modal>

          <Modal
            title='设置角色权限'
            visible={isShowAuth}
            onOk={this.authRole}
            onCancel={() => {
              this.setState({ isShowAuth: false })
            }}
          >
            <AuthForm role={role} setForm={form => (this.form = form)}></AuthForm>
          </Modal>

        </Card>
      </div >
    )
  }
}

export default Role
