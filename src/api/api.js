import {get,post} from "./http.js"
export const apiLogin=p=>post('/api/auth/login',p)
//注册接口
export const apiRegister=p=>post('/api/auth/register',p)
// 退出登录
export const apiLogout=()=>get("/api/auth/logout")

// logo年度等数据
export const apiLogoNav=p=>post('/api/nav/classes',p)

// 请求用户信息
export const apiUserInfo =()=> get("/api/auth/session")

// 请求用户信息
export const apiUserchange =k=> post("/api/auth/login/alterPassword",k)

