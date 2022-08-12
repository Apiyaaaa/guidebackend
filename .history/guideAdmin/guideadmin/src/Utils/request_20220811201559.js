import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://test.mediastack.cn/";

// 请求拦截器
instance.interceptors.request.use(config => {
    console.log('被拦截做一些操作')
    return config
}, err => {
    return err
})

export default instance