import axios from 'axios'

const http = axios.create({
  baseURL: './',
  timeout: 5000
})

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)
http.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error)
)
export {
  http
}
http({
  url: '/usr',
  method: 'get',
  header: {},
  params: {},
  data: {},
  onUploadProgress () {},
  onDownloadProgress () {}
})
