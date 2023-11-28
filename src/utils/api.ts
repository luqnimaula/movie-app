import axios from 'axios'

export const BASE_API_URL = 'https://api.themoviedb.org/3'

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.params = {
      ...config.params,
      api_key: '8d813ed737724950bf0334d811fb2370'
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default api
