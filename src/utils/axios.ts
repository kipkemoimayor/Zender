import * as axios from 'axios'

export const customAxios = (): axios.Axios => {
  const ax = axios.default
  ax.defaults.headers.common['ApiKey'] = process.env.mambu_api_key
  ax.defaults.headers.common['Accept'] = 'application/vnd.mambu.v2+json'
  ax.defaults.baseURL = process.env.mambu_api_url
  return ax
}
