import axios from 'axios'
import { message } from 'antd'

export default function ajxa(url, data = {}, type = "GET") {
  // console.log('url:', url, '----type', type, '-----data:', data)
  return new Promise((resovle, reject) => {
    let promise
    if (type === "GET") {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      if (res.status !== 200) {
        throw new Error('自定义的错误啊~~~')
      }
      resovle(res.data)
    }).catch(err => {
      message.error('请求失败~~~~~' + err)
    })

  })



}
