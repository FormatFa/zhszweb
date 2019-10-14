import axios from 'axios'
import QS from 'qs'
import { resolve, reject } from 'q'
//拦截请求

// axios.interceptors.request.use(config=>{

// },err=>{

// })

// 封装get,post方法
axios.interceptors.response.use(response=>{
    console.log("请求拦截:成功")
    if(response.status===200)
        return Promise.resolve(response)
    else
        return Promise.reject(response)

},err=>{
    console.log("请求拦截:错误界面")
    //请求错误
    return Promise.reject(err.response)

})
export function get(url,params)
{
    return new Promise( (resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{resolve(res.data)}).
        catch(err=>{
            reject(err.data)
        })
    } )


}
//
export function post(url,params)
{

    return new Promise( (resolve,reject)=>{
        axios.post(url,QS.stringify(params)).then(res=>{resolve(res.data)}).catch(err=>{
            reject(err.data)
        })
    } )
}