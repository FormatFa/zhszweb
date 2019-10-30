// 数据界面api
import {get,post} from "./http.js"

//请求解析某个文件入库
export const apiParse=p=>post("/api/folder/handle",p)
export const apiFiles=p=>post("/api/folder/files",p)
export const apiDelete=p=>post("/api/folder/delete",p)
export const apiTruncate=p=>post("/api/folder/truncate")