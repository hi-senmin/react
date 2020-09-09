import React, { Component } from 'react'

import { Card, Input, Select, Button, Table, Divider, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchPro, reqUpdateProduct } from '../../api/index'
const Option = Select.Option
const { Search } = Input;
export class ProductHome extends Component {
  state = {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    loading: true,
    products: [],
    selectId: '1',
  }

  componentDidMount() {
    const { pageNum, pageSize } = this.state
    this.getProducts(pageNum, pageSize)
  }

  getProducts = async (pageNum, pageSize) => {
    this.setState({ loading: true })
    let res = await reqProducts(pageNum, pageSize)
    if (res.status === 0) {
      this.setState({
        products: res.data.list,
        total: res.data.total,
        loading: false
      })
    }

  }

  searchProducts = async (value) => {
    console.log(value, this.state.selectId)
    let { pageNum, pageSize, selectId } = this.state
    let productName = '', productDesc = ''
    if (selectId === '1') {
      productName = value
    } else {
      productDesc = value
    }
    this.setState({
      loading: true
    })
    let res = await reqSearchPro(pageNum, pageSize, productName, productDesc)
    if (res.status === 0) {
      this.setState({
        loading: false,
        total: res.data.total,
        products: res.data.list
      })
    }
  }

  handleChange = (value) => {
    console.log(value)
    this.setState({
      selectId: value
    })
  }

  changeProStatus = async (_id, status) => {
    status = status === 1 ? 0 : 1
    const res = await reqUpdateProduct(_id, status)
    
    const { pageNum, pageSize } = this.state
    this.getProducts(pageNum, pageSize)
    if (res.status === 0) {
      message.success("操作成功")
    } else {
      message.success(res.msg)
    }

  }

  render() {
    const title = (
      <span>
        <Select defaultValue={this.state.selectId} onChange={this.handleChange} style={{ width: '130px' }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Search
          style={{ width: '260px', marginLeft: '20px' }}
          placeholder="请输入"
          enterButton="Search"
          onSearch={this.searchProducts}
        />
        {/* <Button type='primary' onClick={this.searchProducts}>搜索</Button> */}
      </span>
    )
    const extra = (
      <Button icon="plus" type="primary" shape="circle" onClick={() => { this.props.history.push('/product/addupdate') }}></Button>
    )
    const { products, loading, pageSize, total } = this.state
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => {
          return '￥' + price
        }
      },
      {
        width: 160,
        title: '状态',
        render: (product) => {
          const { _id, status } = product
          return (
            <span>
              {/* {status === 1 ? (<Button type="danger">下架</Button>) : (<Button type="primary">上架</Button>)} */}
              <Button
                type={status === 1 ? 'danger' : 'primary'}
                onClick={() => this.changeProStatus(_id, status)}>
                {status === 1 ? '下架' : '上架'}
              </Button>
              <Divider type="vertical" />
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 130,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => { this.props.history.push('/product/detail', { product }) }}>详情</LinkButton>
              <Divider type="vertical" />
              <LinkButton onClick={() => { this.props.history.push('/product/addupdate', { product }) }}>修改</LinkButton>
            </span>
          )
        }
      },
    ];

    return (
      <Card title={title} extra={extra}>
        <Table
          pagination={{
            defaultPageSize: pageSize,
            total: total,
            onChange: this.getProducts
          }}

          dataSource={products}
          columns={columns}
          rowKey='_id'
          bordered
          loading={loading}
        />
      </Card>
    )
  }
}

export default ProductHome
