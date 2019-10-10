import axios from 'axios'
import QS from 'qs'
import { resolve, reject } from 'q'


// 封装get,post方法

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