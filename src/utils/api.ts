import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.params = {
      ...config.params,
      api_key: process.env.REACT_APP_API_KEY
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
