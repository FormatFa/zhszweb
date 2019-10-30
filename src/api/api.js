import {get,post} from "./http.js"
export const apiLogin=p=>post('/api/auth/login',p)
//注册接口
export const apiRegister=p=>post('/api/auth/register',p)
//首页年度数据
export const apiYears=p=>get('/test')

//后台数据管理
//数据库基本信息
export const apiData=p=>get('xx')
//请求某个年度的数据文件信息

// 请求解析某个文件

