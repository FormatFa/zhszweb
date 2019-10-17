<template>

    <div>
        
        <!-- <el-dialog
        title="登录"
        :visible.sync="isShow"
        > -->
        <el-row type="flex" justify="center">
            <el-col :span="15">
                
    <el-carousel height="600px" >
        <el-carousel-item>
            <img src="/img1.jpg" width="100%" height="100%">
        </el-carousel-item>
            <el-carousel-item>
            <img src="/img2.jpg" width="100%" height="100%">
        </el-carousel-item>
        <el-carousel-item>
            <img src="/img3.jpg" width="100%" height="100%">
        </el-carousel-item>
    </el-carousel>
            </el-col>
            <el-col  :offset="6" :span="6" style="margin-left: 100px;"><el-card>
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="login.username"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="login.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-on:click="submitLogin">立即登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        </el-col>
        </el-row>
            
        <!-- </el-dialog> -->



    </div>
    
</template>

<script>
// 测试页面
import {apiLogin,apiYears} from '../api/api.js'

import {EventBus} from '../event-bus.js'
export default {

    name:"Test",
    created(){
        console.log("create....")
        EventBus.$on("showLogin",()=>{
            this.isShow=true
        })

    },
    data(){
        return {
        
        isShow:true,
        login:{
         username:"",   
         password:""
        }
        }
    },
    methods:{
       
        //打开登录按钮
        openLogin(){
            this.isShow=true
        },
        submitLogin(){
            console.log("提交登录....")
            
            apiLogin({
                username:this.username,
                password:this.password
            }).then(res=>{
                console.log("请求成功")
                console.log(res)
                this.isShow=false
                // 登录成功，跳转到首页
                //this.$router.push("college")
                

                //保存cookes
            }).catch(err=>{

                console.log("请求失败")
                
                this.$message({
                    type:"success",
                    message:"登录成功，正在跳转到页面"
                })
                this.$router.push({name:"college"})
                //this.$message.error("请求数据失败,请检查网络连接")

            })
        }
    }

}
</script>

<style>
/* html,body{cursor: url(foo.cur), url(http://www.example.com/bar.gif), auto;} */
html,body{cursor:url('../images/mouse.png'),auto}
</style>