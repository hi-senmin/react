import React, { Component } from 'react'

import { Card, Input, Select, Button, Table } from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchPro } from '../../api/index'
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

  componentDidMount() {
    const { pageNum, pageSize } = this.state
    this.getProducts(pageNum, pageSize)
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
        width: 100,
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          if (status === 1) {
            return (
              <span>
                <Button type="danger">下架</Button>
                <span>在售</span>
              </span>
            )
          } else {
            return (
              <span>
                <Button type="primary">上架</Button>
                <span>已下架</span>
              </span>
            )
          }
        }
      },
      {
        width: 80,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => { this.props.history.push('/product/detail', { product }) }}>详情</LinkButton>
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
