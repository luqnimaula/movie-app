import api from "./api"

const BASE_API_URL = process.env.REACT_APP_BASE_API
const API_KEY = process.env.REACT_APP_API_KEY

describe('Testing api service utils', () => {
  it('should set baseURL and headers correctly', () => {
    expect(api.defaults.baseURL).toBe(BASE_API_URL)
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })
  
  it('should intercept request and add API key to params', () => {
    const mockedConfig = { params: {} }
    const handler = api.interceptors.request.handlers[0].fulfilled
    const modifiedConfig = handler(mockedConfig)
    expect(modifiedConfig.params.api_key).toBe(API_KEY)
  })

  it('should handle response', async () => {
    const mockedResponseInterceptor = api.interceptors.response.handlers[0].fulfilled
    const response = { data: 'response-data' }

    const modifiedResponse = mockedResponseInterceptor(response)

    expect(modifiedResponse).toEqual(response)
  })

  it('should handle request errors', async () => {
    const mockedErrorInterceptor = api.interceptors.request.handlers[0].rejected

    let err: unknown

    try {
      await mockedErrorInterceptor(new Error('Request failed'))
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(Error)
    expect((err as { message: string }).message).toBe('Request failed')
  });


  it('should handle response errors', async () => {
    const mockedErrorInterceptor = api.interceptors.response.handlers[0].rejected

    let err: unknown

    try {
      await mockedErrorInterceptor(new Error('Response failed'))
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(Error)
    expect((err as { message: string }).message).toBe('Response failed')
  });
})