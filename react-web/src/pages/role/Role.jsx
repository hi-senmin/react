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

import { reqRoles, reqAddRole, reqUpdateRole } from '../../api/index'

import AddForm from './AddForm'
import AuthForm from './AuthForm'
export class Role extends Component {

  constructor(props) {
    super(props)

    this.state = {
      roles: [],
      role: {}, // 
      isShowAdd: false, // 
      isShowAuth: false
    }

    this.auth = React.createRef()

  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getRoles()
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
        const res = await reqAddRole(roleName)
        if (res.status === 0) {
          message.success('添加成功')
          this.getRoles()

          this.setState({ isShowAdd: false })
          this.form.resetFields()
        } else {
          message.error('添加失败')
        }
      } else {
        message.error('添加失败')
      }
    })
  }

  updateRole = async () => {
    let role = this.state.role

    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = this.props.username

    const res = await reqUpdateRole(role)
    if (res.status === 0) {
      message.success('操作成功')
      this.setState({ isShowAuth: false })
      this.getRoles()
    } else {
      message.error(res.msg)
    }
  }

  getRoles = async () => {
    const res = await reqRoles()
    if (res.status === 0) {
      this.setState({
        roles: res.data
      })
    }
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
            onOk={this.updateRole}
            onCancel={() => {
              this.setState({ isShowAuth: false })
            }}
          >
            <AuthForm ref={this.auth} role={role} ></AuthForm>
          </Modal>

        </Card>
      </div >
    )
  }
}

export default Role
