import axios from 'axios';
// import * as Cookies from "js-cookie";

let httpClient = axios.create({
	headers: {
		"Content-Type": "application/json",
    "Accept": "application/json",
    // "Authorization": `Bearer ${Cookies.get("token")}`
	}
});

// 添加响应拦截器
httpClient.interceptors.response.use(function (response) {
	console.log("response", response);
    // 对响应数据做点什么
    return response;
  }, function (error) {
    console.log("error", error);
    if(error.response) {
      // 对响应错误做点什么
      if(error.response.status == 500){
        window.location.href = "#/login";
      }
    }
    //location.href = "/#/login";
    return Promise.reject(error);
});
class HttpClient {
  constructor() {
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // console.log("response", response);
        // 对响应数据做点什么
        return response;
      }, function (error) {
        console.log("error", error);
        // 对响应错误做点什么
        if(error.response){
          if(error.response.status == 401){
            window.location.href = "#/login";
          }else{
            console.error("接口服务异常 httpCode:"+error.response.status);
          }
        }else{
          console.error("接口服务异常");
        }
        return Promise.reject(error);
    });
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      // "Authorization": `Bearer ${Cookies.get("token")}`
    }
  }

  get(url, config={}) {
    config = Object.assign(config, {
      headers: this.getHeaders()
    });
    return axios.get(url, config);
  }

  post(url, data, config={}) {
    config = Object.assign(config, {
      headers: this.getHeaders()
    });
    return axios.post(url, data, config);
  }
}


export default new HttpClient();
