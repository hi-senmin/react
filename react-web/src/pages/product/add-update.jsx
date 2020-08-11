import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader, Icon, message } from 'antd'

import LinkButton from '../../components/link-button'
import PicturesWall from './PicturesWall'
import RichTextEditor from './RichTextEditor'

import { reqCategroty, reqAddProducts } from '../../api/index'

const { TextArea } = Input
const Item = Form.Item

const options = [];

class AddUpdate extends Component {
  constructor(props) {
    super(props)
    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  state = {
    options,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { name, desc, price, categoryIds } = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }

        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        let product = { categoryId, pCategoryId, name, desc, price, imgs, detail }
        console.log(product)

        let res = await reqAddProducts(product)
        if (res.status === 0) {
          message.success('添加成功')
          this.props.form.resetFields()
          this.props.history.goBack()
        } else {
          message.error('添加失败')
        }
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
  };

  validatorPrice = (rule, value, callback) => {
    if (isNaN(value)) {
      callback('必须是数字')
      return
    }
    if (value > 0) {
      callback()
    } else {
      callback('必须大于0')
    }
  }

  initOption = (categorys) => {
    let options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))

    this.setState({ options })
  }

  getCategorys = async (parentId) => {
    let res = await reqCategroty(parentId)
    if (res.status === 0) {
      let categorys = res.data
      if (parentId === '0') {
        this.initOption(categorys)
      } else {
        return categorys
      }
    }
  }

  loadData = async (selectedOptions) => {

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    let subCategory = await this.getCategorys(targetOption.value)
    targetOption.loading = false;

    if (subCategory && subCategory.length > 0) {
      let childOptions = subCategory.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }

    this.setState({
      options: [...this.state.options],
    });
  }

  componentDidMount() {
    this.getCategorys('0')
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => { this.props.history.goBack() }}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign="left">
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your note!' }],
              })(
                <Input placeholder='请输入商品名称' autoComplete='off' />
              )
            }
          </Item>

          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                rules: [{ required: true, message: 'Please input your note!' }],
              })(
                <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />
              )
            }
          </Item>

          <Item label='商品价格'>
            {
              getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input your note!' }, { validator: this.validatorPrice }],
              })(
                <Input prefix="￥" suffix="元" autoComplete='off' />
              )
            }
          </Item>

          <Item label='商品分类' >
            {
              getFieldDecorator('categoryIds', {
                rules: [{ required: true, message: 'Please input your note!' }],
              })(
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                />
              )
            }
          </Item>

          <Item label='商品图片' wrapperCol={{ sm: { span: 16 } }} >
            <PicturesWall ref={this.pw}></PicturesWall>
          </Item>
          <Item label='商品详情' wrapperCol={{ sm: { span: 16 } }}>
            <RichTextEditor ref={this.editor}></RichTextEditor>
          </Item>

          <Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card >
    )
  }
}

export default Form.create()(AddUpdate)
