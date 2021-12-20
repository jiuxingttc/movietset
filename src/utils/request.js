import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'

// 创建实例
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000 // 超时
})


// request 拦截器
service.interceptors.request.use(
  config => {
  
    if (store.state.token) {
      config.headers['token'] = "Bearer "+store.state.token
    }
    return config
  },
  error => {
    // 请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data

    // 返回code 不为 20000时，错误
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || '发生错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 错误的 token; 
      // 50012: 错误登录; 
      // 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm('你尚未登录或过期，请重新登录', '重新登录', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          router.push('/login')
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
