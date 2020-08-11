import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { reqCategory } from '../../api'

import {
  Card,
  Icon,
  List
} from 'antd'
const Item = List.Item

export default class productDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cName1: '',
      cName2: '',
      product: props.location.state.product,
    }
  }

  async componentDidMount() {
    const product = this.state.product
    console.log(product)
    const { categoryId, pCategoryId } = product

    if (pCategoryId === '0') {
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({ cName1 })
    } else {
      const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = result[0].data.name
      const cName2 = result[1].data.name
      this.setState({ cName1, cName2 })
    }
  }


  render() {
    const { name, desc, price, detail, imgs } = this.state.product
    const { cName1, cName2 } = this.state
    const title = (
      <span>
        <LinkButton onClick={() => { this.props.history.goBack() }}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title}>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>

          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' —> ' + cName2 : ''}</span>
          </Item>

          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={img}
                    className="product-img"
                    alt="img"
                    width="150"
                    style={{ margin: '0 10px' }}
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}
