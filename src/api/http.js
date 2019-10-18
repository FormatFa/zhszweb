import axios from 'axios'
import QS from 'qs'
import { resolve, reject } from 'q'
import router from '../router.js'
import { Message } from 'element-ui';
//拦截请求

// axios.interceptors.request.use(config=>{

// },err=>{

// })
//设置baseurl,后面的请求都会用这个接起来
//axios.defaults.baseURL="http://localhost:5000"

axios.defaults.withCredentials=true

// 封装get,post方法
axios.interceptors.response.use(response=>{
    console.log("请求拦截:成功")
    if(response.status===200)
        return Promise.resolve(response)
    else
        return Promise.reject(response)

},err=>{

    console.log("拦截失败")
    if(err['response']===undefined)
    {
        return  Promise.reject(err)
    }
    console.log(err.response)
    switch(err.response.status)
    {
        //没有登录,重定向到登录界面
        case 401:
            Message({
                type:"error",
                message:"没登录，重定向到登录界面"
            })
            console.log("-------------重定向................")
            router.replace({name:"login"})
            break
        case 403:
                Message({
                    type:"error",
                    message:"403"
                })
            break
    }
    // console.log("请求拦截:错误界面")
    // console.log(err)
    //请求错误
    return Promise.reject(err)

})
export function get(url,params)
{
    return new Promise( (resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{resolve(res.data)}).
        catch(err=>{
            reject(err)
        })
    } )


}
//
export function post(url,params)
{
    console.log("post：参数:")
    console.log(params)
    return new Promise( (resolve,reject)=>{
        axios.post(url,QS.stringify(params)).then(res=>{resolve(res.data)}).catch(err=>{
            reject(err)
        })
    } )
}