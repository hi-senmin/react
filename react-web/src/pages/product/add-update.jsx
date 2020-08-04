import React, { Component } from 'react'
import { Card, Form, Input, Button, Upload, Cascader, Icon, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategroty, reqAddProducts } from '../../api/index'

const { TextArea } = Input
const Item = Form.Item

const options = [];

class AddUpdate extends Component {
  state = {
    options,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { name, desc, price } = values
        let [categoryId, pCategoryId] = values.categoryId
        let res = await reqAddProducts(categoryId, pCategoryId, name, desc, price)
        if (res.status === 0) {
          message.success('添加成功')
          this.props.form.resetFields()
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

    const targetOption = selectedOptions[0];
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

      this.setState({
        options: [...this.state.options],
      });
    } else {
      targetOption.isLeaf = true
    }
  }

  initOption = (categorys) => {
    let options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))

    this.setState({ options })
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
              getFieldDecorator('categoryId', {
                rules: [{ required: true, message: 'Please input your note!' }],
              })(
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                />
              )
            }
          </Item>

          <Item label='商品图片'>
            <div>
              商品图片
            </div>
          </Item>
          <Item label='商品详情'>
            <div>
              商品详情
            </div>
          </Item>

          <Item >
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddUpdate)
