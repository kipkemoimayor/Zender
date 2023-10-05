import * as axios from 'axios'
import { Axconfig } from '../nuovo/api'

export const customAxios = ({ baseUrl, apiKey }: Axconfig): axios.Axios => {
  const ax = axios.default
  ax.defaults.headers.common['ApiKey'] = apiKey
  ax.defaults.headers.common['Authorization'] = `Token ${apiKey}`
  ax.defaults.headers.common['Accept'] = 'application/vnd.mambu.v2+json'
  ax.defaults.baseURL = baseUrl
  return ax
}
