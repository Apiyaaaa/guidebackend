// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}

export default Request

作者：一碗周
链接：https://juejin.cn/post/7071518211392405541
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。