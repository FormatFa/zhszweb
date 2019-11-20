import {get,post} from "./http.js"
export const apiLogin=p=>post('/auth/login',p)
//注册接口
export const apiRegister=p=>post('/auth/register',p)
// 退出登录
export const apiLogout=()=>get("/auth/logout")

// logo年度等数据
export const apiLogoNav=p=>post('/nav/classes',p)

// 请求用户信息
export const apiUserInfo =()=> get("/auth/session")

// 请求用户信息
export const apiUserchange =k=> post("/auth/login/alterPassword",k)

