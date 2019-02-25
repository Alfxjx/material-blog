import axios from 'axios'

const urlMap = {
  devlopment: '/',
  production: 'http://www.alfxjx.club'
}

const baseUrl = urlMap[process.env.NODE_ENV === 'production']

export function get(url) {
  return function (params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { statusCode, data } = res.data
      if (statusCode === 1) {
        return data
      }
    }).catch((e) => {
      console.log('error')
    })
  }
}
