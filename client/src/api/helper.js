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
      const {statusCode, msg, data} = res.data
      console.log(msg)
      if (statusCode === 1) {
        return data
      }
    }).catch((e) => {
      console.log('error')
    })
  }
}

export function writeBlog(url, params) {
  return axios.post(baseUrl + url, {
    params
  }).then((res) => {
    const {statusCode, msg} = res.data
    console.log(msg)
    if (statusCode === 1) {
      return msg
    }
  }).catch((e) => {
    console.log('error')
  })
}

export function register(username, password) {
  return axios({
    method: 'post',
    datatType: 'jsonp',
    url: baseUrl + '/registry/local',
    headers: {
      'x-csrf-token': 'f3WeUA9nX2Ep72Qeab91C9XR'
    },
    data: {
      username: username,
      password: password
    },
    withCredentials: true
  }).then((res) => {
    const {statusCode, msg, data} = res.data
    if (statusCode === 1) {
      console.log(data)
    }
  }).catch((e) => {
    console.log('error')
  })
}

export async function checkUser(name) {
  try {
    let res = await axios.get(baseUrl + '/user/check-username?username=' + name)
    res = res.data
    if (res.statusCode === 1) {
      console.log(res.statusCode)
      return res.statusCode
    }
  } catch (e) {
    console.log(e)
  }
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
    const token = getCookie("csrfToken")
    if (token) {
      headers['x-csrf-token'] = token
    }
    // 请求对象转换成appliction/x-www-form-urlencoded格式
    if (typeof data === 'object') {
      // headers['Content-Type'] = 'appliction/x-www-form-urlencoded'
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
function getCookie(cName) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + "=")
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(";", cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ""
}


// instance.interceptors.request.use(function (config) {
//   if (localStorage.getItem('_csrfToken')) {
//     try {
//       let token = localStorage.getItem('_csrfToken')
//       config.headers['x-csrf-token'] = token
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

export async function generalRequest(url, method, params) {
  const res = await instance[method](baseUrl + url, params)
  console.log(res)
  const {statusCode} = res.data
  if (statusCode !== 1) {
    return false
  } else {
    return res.data
  }
};
