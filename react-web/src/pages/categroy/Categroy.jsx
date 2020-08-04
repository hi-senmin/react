import React, { Component } from 'react'
import { Card, Button, Table, Modal, message, Icon } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategroty, reqUpdateCategory, reqAddCategory } from '../../api/index'
import AddForm from './Add_form'
import UpdateForm from './Update_form'
export class Categroy extends Component {
  state = {
    categroys: [],
    subCategroys: [],
    loading: false,
    parentId: "0",
    parentName: '',
    visible: 0
  }
  initColums = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 200,
        render: (categroy) => {
          return (
            <span>
              <LinkButton onClick={() => this.showModal(2, categroy)}>修改分类</LinkButton>
              {
                this.state.parentId === "0" ? <LinkButton onClick={() => this.showSubCategorys(categroy)}>查看二级分类</LinkButton> : null
              }
            </span>
          )
        }
      },
    ];
  }
  showSubCategorys = async (categroy) => {
    this.setState({
      parentId: categroy._id,
      parentName: categroy.name
    }, () => {
      this.getCategroys()
    })

  }
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategroys: []
    })
  }
  getCategroys = async (parentId) => {
    this.setState({ loading: true })
    parentId = parentId || this.state.parentId
    let res = await reqCategroty(parentId)
    if (res.status === 0) {
      const categroys = res.data
      if (parentId === '0') {
        this.setState({
          categroys
        })
      } else {
        this.setState({
          subCategroys: categroys
        })
      }
    } else {
      message.error('失败了！！')
    }
    this.setState({ loading: false })
  }

  showModal = (type, categroy) => {
    this.setState({
      visible: type,
    });
    if (!categroy) return
    this.categroy = categroy || {}
  };

  addCategory = async (e) => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let { categoryName, parentId } = values
        let res = await reqAddCategory(parentId, categoryName)
        if (res.status === 0) {
          if (parentId === this.state.parentId) {
            this.getCategroys()
          } else if (parentId === '0') {
            this.getCategroys('0')
          }
          message.success("添加成功")
        } else {
          message.error("添加失败····")
        }
        this.setState({
          visible: 0,
        });
        this.form.resetFields()
      }
    })
  }

  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let categoryId = this.categroy._id
        let { categoryName } = values
        const res = await reqUpdateCategory(categoryId, categoryName)
        if (res.status === 0) {
          this.getCategroys()
          message.success("更新成功")
        } else {
          message.error("更新失败！！！")
        }
        this.setState({
          visible: 0,
        });
        this.form.resetFields()
      }
    })
  };

  getNewCategoryName = (newName) => {
    this.NewcategoryName = newName
  }

  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      visible: 0,
    });
  };
  componentWillMount() {
    this.initColums()
  }
  componentDidMount() {
    this.getCategroys()
  }
  render() {
    const title = this.state.parentId === "0" ? '一级分类' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类</LinkButton>
        <Icon type="right" style={{ color: '#1DA57A', margin: "0 10px" }} />
        <span>{this.state.parentName}</span>
      </span>
    )
    const extra = (
      <Button icon="plus" type="primary" shape="circle" onClick={() => this.showModal(1)}></Button>
    )
    const { categroys, loading, parentId, subCategroys } = this.state
    // const locale = { emptyText: '暂无数据' }

    return (
      <div style={{ 'height': '100%' }}>
        <Card title={title} extra={extra}>
          <Table style={{ 'height': '100%' }}

            dataSource={parentId === "0" ? categroys : subCategroys}
            columns={this.columns}
            bordered
            loading={loading}
            rowKey='_id'
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />;
        </Card>

        <Modal
          title="添加分类"
          visible={this.state.visible === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categroys={this.state.categroys}
            parentId={this.state.parentId}
            setForm={(form) => { this.form = form }}
          />
        </Modal>

        <Modal
          title="修改分类"
          visible={this.state.visible === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categroyName={this.categroy}
            setForm={(form) => { this.form = form }}
          />
        </Modal>
      </div>
    )
  }
}

export default Categroy
