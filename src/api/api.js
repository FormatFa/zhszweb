import {get,post} from "./http.js"
export const apiLogin=p=>post('api/login',p)

//首页年度数据
export const apiYears=p=>get('')