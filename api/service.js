

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
class Request {
  _header = {
    token: null
  }
  _baseUrl = null

  interceptors = []

  constructor() {
    const token = wx.getStorageSync('token')
    if (token) {
      this._header.token = token
    }
  }

  intercept(res) {
    return this.interceptors
      .filter(f => typeof f === 'function')
      .every(f => f(res))
  }
  request({ url, method, header = {}, data }) {
    return new Promise((resolve, reject,complete) => {
      wx.request({
        url: (this._baseUrl || '') + url,
        method: method || METHOD.GET,
        data: data,
        header: {
          ...this._header,
          ...header
        },
        success: res => this.intercept(res) && resolve(res),
        fail: reject,
        complete:complete
      })
    })
  }
  /**
   * 上传文件
   */
  uploadFile({ url, header = {}, data, filePath }){
    console.log(url,header,data,filePath)
    return new Promise((resolve, reject, complete) => {
      wx.uploadFile({
        url: (this._baseUrl || '') + url,
        filePath: filePath,
        name: 'file',
        header: {
          
          ...this._header,
          ...header,
          "Content-Type": "multipart/form-data",
        },
        formData: data,
        success: res=>resolve(res),
        fail: reject,
        complete: complete,
      })
    })
  }

  get(url, data, header) {
    return this.request({ url, method: METHOD.GET, header, data }).then(result => {
      result.errMsg = '网络异常'
      return result
    })
  }
  post(url, data, header) {
    return this.request({ url, method: METHOD.POST, header, data }).then(result => {
      result.errMsg = '网络异常'
      return result
    })
  }
  /**
   * 处理返回处理后的业务数据，不需要再判断小程序自己的那一套数据，
   */
  postP(url, data, header){
    return this.post(url,data,header).then((result)=>{
      console.log(result)
      if (result && result.data && result.data.msg){
        if (result.data.msg.code == "0"){
          console.log(result.data.data)
          return result.data.data
        }else{
          //此处一般为服务端传递过来业务逻辑的异常信息
          let error = new ReferenceError(result.data.msg.info);
          error.code = result.data.msg.code;
          throw error
        }
      } else {
        throw new ReferenceError("获取数据失败")
      } 
    })
  }
  getP(url, data, header) {
    return this.get(url, data, header).then((result) => {
      console.log(result)
      if (result && result.data && result.data.msg) {
        if (result.data.msg.code == "0") {
          console.log(result.data.data)
          return result.data.data
        } else {
          //此处一般为服务端传递过来业务逻辑的异常信息
            let error = new ReferenceError(result.data.msg.info);
            error.code = result.data.msg.code;
            throw error
        }
      } else {
        throw new ReferenceError("获取数据失败")
      } 
    })
  }
  put(url, data, header) {
    return this.request({ url, method: METHOD.PUT, header, data })
  }
  delete(url, data, header) {
    return this.request({ url, method: METHOD.DELETE, header, data })
  }

  token(token) {
    this._header.token = token
    return this
  }
  header(header) {
    this._header = header
    return this
  }
  baseUrl(baseUrl) {
    this._baseUrl = baseUrl
    return this
  }
  interceptor(f) {
    if (typeof f === 'function') {
      this.interceptors.push(f)
    }
    return this
  }
}
export default new Request
export { METHOD }