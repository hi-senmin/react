// 入口文件
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import memoryUtil from './utils/memoryUtil'
import storege from './utils/storege'

const user = storege.getUser()
memoryUtil.user = user

ReactDOM.render(<App />, document.getElementById('root'))
