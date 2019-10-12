import {get,post} from "./api/http.js"

import {college} from './api/testdata.js'
// 全局
export const store = {

    state:{
        //当前选择的年度
        year:"2019",
        //当前选择的学期
        term:"term1",
        i:1,
        // 学院数据
        collegeData:{
            
        },

        //获取当前学期
        termName(){
            if(this.term=="term1")
            {
                return "第一学期"
            }
            else if(this.term=="term2")
            {
                return "第二学期"
            }
            else if(this.term=="year"){
                return "年度"
            }
        }

    },
    setYear(year){
        this.state.year=year
    },
    setTerm(term){
        this.state.term=term
    },
    requestCollege(){
        get("xxx").then(res=>{
            console.log("请求学院数据:..")
            console.log(res)
        }).catch(err=>{
            console.log("请求数据失败>>>")
            console.log(err)
            //设置成测试数据
            this.state.collegeData="i"+this.state.i
            this.state.i+=1
        })
    }

}