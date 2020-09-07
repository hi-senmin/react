
import React, { Component } from 'react'

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {

  constructor(props) {
    super(props)

    const html = this.props.detail
    if (html) {
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState, // 创建一个没有内容的编辑对象
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
      }
    }

  }

  /*
  输入过程中实时的回调
   */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  // 返回输入数据对应的html格式的文本
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state

    return (
      <div>
        <Editor
          localization={{ locale: 'zh' }}
          editorState={editorState}
          editorStyle={{
            border: '1px solid #F1F1F1', minHeight: 200, paddingLeft: 10,
            borderRadius: '2px !important'
          }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    )
  }
}
