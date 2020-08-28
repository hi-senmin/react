import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'


// import PropTypes from 'prop-types'
// import { reqDeleteImg } from '../../api'


export default class PicturesWall extends React.Component {

  constructor(props) {
    super(props)

    let fileList = []

    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: img, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: img
      }))
    }
    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList // 所有已上传图片的数组
    }
  }

  /*
  获取所有已上传图片文件名的数组
   */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }


  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList)
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === 'removed') {
      // 删除图片
      // const result = await reqDeleteImg(file.name)
      // if (result.status === 0) {
      //   message.success('删除图片成功!')
      // } else {
      //   message.error('删除图片失败!')
      // }
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleRemove = (file) => {
    const fileList = this.state.fileList.filter((item) => {
      return item.uid !== file.uid
    })
    this.setState({
      fileList
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })


  handleCustomRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) => {
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    const url = window.URL || window.webkitURL
    let src = url.createObjectURL(file)

    const response = {
      uid: src,
      name: src,
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: src,
    }
    // this.handleChange(response)
    this.setState({
      fileList: [...this.state.fileList, { ...response }]
    })
  }

  render() {
    const { fileList, previewVisible, previewImage } = this.state

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>上传图片</div>
      </div>
    )

    return (
      <div>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          customRequest={this.handleCustomRequest}
          fileList={fileList} /*所有已上传图片文件对象的数组*/
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}