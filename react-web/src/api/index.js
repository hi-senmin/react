import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `//api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "success") {
        // let { dayPictureUrl, weather } = data.results[0].weather_data[0]
        // resolve(dayPictureUrl, weather)
        resolve(data.results)
      } else {
        message.error('请求失败~~~~~' + err)
      }
    })
  })
}

// 用户----------------------------------------
export const reqLogin = (userName, password) => ajax('/login', { username: userName, password: password }, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

export const reqUsers = () => ajax('/manage/user/list', {}, 'GET')

export const reqUpdateUser = (user) => ajax('/manage/user/update', user, 'POST')

export const reqDeleteUser = (userId) => ajax('/manage/user/delete', { userId }, 'POST')

// 用户-END---------------------------------------



// 角色 -----------------------------------------------
export const reqRoles = () => ajax('/manage/role/list', {}, 'GET')

export const reqAddRole = (roleName) => ajax('/manage/role/add', { roleName }, 'POST')



// 分类 商品 -------------------------------------------------
export const reqCategroty = (parentId) => ajax('/manage/category/list', { parentId })

export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })

export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', { parentId, categoryName }, 'POST')

export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST')

export const reqProducts = (pageNum, pageSize, productName, productDesc) => ajax('/manage/product/list', { pageNum, pageSize, productName, productDesc }, 'GET')

export const reqAddProducts = ({ categoryId, pCategoryId = '0', name, desc, price, imgs, detail, _id }) => ajax(`/manage/product/${_id ? 'update' : 'add'}`,
  { categoryId, pCategoryId, name, desc, price, detail, imgs, _id }, 'POST')

export const reqSearchPro = (pageNum, pageSize, productName, productDesc) => ajax('/manage/product/search', { pageNum, pageSize, productName, productDesc }, 'GET')

export const reqUpdateProduct = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, 'POST')
