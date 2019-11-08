// 数据界面api
import {get,post} from "./http.js"

//请求解析某个文件入库
export const apiParse=p=>post("/api/folder/handle",p,{timeout:10000})
export const apiFiles=p=>post("/api/folder/files",p)
// 删除某个数据
export const apiDelete=p=>post("/api/folder/delete",p)
// 清空所有数据
export const apiTruncate=p=>post("/api/folder/truncate")

// 获取已上传的数据api
export const apiUploaded=p=>post("/api/folder/uploaded")