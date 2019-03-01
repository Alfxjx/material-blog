import axios from 'axios'
import qs from 'qs'
const urlMap = {
  devlopment: '/api',
  production: 'http://www.alfxjx.club/api-blog'
}

const baseUrl = urlMap[process.env.NODE_ENV === 'production' ? 'production' : 'devlopment']

export function get(url) {
  return function (params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { statusCode, msg, data } = res.data
      console.log(msg)
      if (statusCode === 1) {
        return data
      }
    }).catch((e) => {
      console.log('error')
    })
  }
}

export function getContent(id) {
  axios.get(baseUrl + '/blog/' + id).then((res) => {
    const { statusCode, msg, data } = res.data
    if (statusCode === 1) {
      console.log(msg)
      console.log(data)
      return data
    }
  }).catch((e) => {
    console.log('error')
  })
}
// axios配置
const axiosBaseConfig = {
    // baseURL: prefix,
    timeout: 10000,
    // headers: { 'Content-Type': 'appliction/json' },

    // 跨域请求，是否带上认证信息
    withCredentials: true, // default
    // http返回的数据类型
    // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    // http请求返回状态码检查
    validateStatus: status =>
      status >= 200 && status < 310, // default
    // 请求数据预处理
    responseEncoding: 'utf8', // default

    transformRequest: [(data, headers) => {
      // 加入token？
      const token = sessionStorage.getItem('_csrfToken')
      if (token) {
        headers['x-csrf-token'] = token
      }
      // 请求对象转换成json字符串
      if (typeof data === 'object') {
        headers['Content-Type'] = 'appliction/json'
        return qs.stringify(data)
      }
      return data
    }],
    // 返回数据预处理
    transformResponse: [respData =>
      // 数据预处理
      respData
    ]
}
const instance = axios.create(axiosBaseConfig)
// 请求拦截器
instance.interceptors.request.use(function (config) {
  if (localStorage.getItem('_csrfToken')) {
    try {
      let token = localStorage.getItem('_csrfToken')
      config.headers['x-csrf-token'] = token
    } catch (e) {
      console.error(e)
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.headers._csrfToken) {
    console.log("_csrfToken:" + response.headers._csrfToken)
    localStorage.setItem('_csrfToken', response.headers._csrfToken)
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
export async function generalRequest(url, method, params) {
  const res = await instance[method](baseUrl + url, params)
  const { statusCode } = res.data
  if (statusCode !== 1) {
    return false
  } else {
    return res.data
  }
};
