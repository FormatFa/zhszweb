import {get,post} from "./http.js"
export const apiLogin=p=>post('/api/auth/login',p)
//注册接口
export const apiRegister=p=>post('/api/auth/register',p)
//首页年度数据
export const apiYears=p=>get('/test')

