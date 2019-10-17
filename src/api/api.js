import {get,post} from "./http.js"
export const apiLogin=p=>post('/auth/login',p)

//首页年度数据
export const apiYears=p=>get('/test')

//后台数据管理
//数据库基本信息
export const apiData=p=>get('xx')