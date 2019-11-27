import axios from 'axios'
import QS from 'qs'
import { resolve, reject } from 'q'
import router from '../router.js'
import { Message } from 'element-ui';
// axios 封装， 封装get,post请求

//设置baseurl,后面的请求都会用这个接起来,设置为后端地址
// axios.defaults.baseURL="http://127.0.0.1:5000/"
//axios.defaults.baseURL="/"
axios.defaults.withCredentials = true
// 设置超时时间
axios.defaults.timeout = 3000;
//默认是表单格式，现在改成json
axios.defaults.headers.post['Content-Type'] = 'Content-Type：application/json;charset=UTF-8';


// response 拦截，所有的请求回应都会通过这里
axios.interceptors.response.use(response => {

    console.log("请求拦截:成功")

    if (response.status === 200)
        return Promise.resolve(response)
    else
        return Promise.reject(response)
}, err => {
    // 响应失败的500等都会在这里
    console.log("拦截失败")
    // 对于有些响应失败的,response 是空的，直接将message返回
    if (err['response'] === undefined) {
        return Promise.reject(err.message)
    }
    console.log(err.response)
    // 有错误码的话，直接判断错误码
    switch (err.response.status) {
        //没有登录,重定向到登录界面
        case 401:
            Message({
                type: "error",
                message: "没登录，重定向到登录界面"
            })
            console.log("-------------重定向................")
            router.replace({ name: "login" })
            break
        case 403:
            // Message({
            //     type:"error",
            //     message:"403"
            // })
            break
    }
    // console.log("请求拦截:错误界面")
    // console.log(err)
    //请求错误 ,这里是把整个err对象返回，要获取返回的信息,err.response
    return Promise.reject(err)

})
//get方法封装
export function get(url, params) {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => { resolve(res.data) }).
            catch(err => {
                reject(err)
            })
    })
}
//post方法封装
export function post(url, params,config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,config).then(res => { resolve(res.data) }).catch(err => {
            reject(err)
        })
    })
}