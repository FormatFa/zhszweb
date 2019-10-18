<template>

    <div id="logo">
    
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
            <el-col  :offset="8" :span="6" style="margin-left: 100px;margin-top: 80px"><el-card>
            <el-form :rules="rules" ref="loginForm">
                <el-form-item label="用户名" prop="name" >
                    <el-input v-model="login.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
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
    
    name:"logo",
    created(){
        console.log("create....")
        EventBus.$on("showLogin",()=>{
            this.isShow=true
        })

    },
    data(){
        return {
        rules:{
            name:[
                {required:true,message:"请输入用户名", trigger: 'blur'}
            ],
            password:[
                {required:true,message:"请输入密码", trigger: 'blur'},
                {min:8,max:8,message:"长度为8到16位", trigger: 'blur'   }
            ]
        },

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
            this.$refs['loginForm'].validate((valid)=>{
                if(valid)
                {
                    alert("sss")
                }
                else
                {
                    console.log("err")
                }
            })
            apiLogin({
                username:this.login.username,
                password:this.login.password
            }).then(res=>{
                console.log("请求成功")
                console.log(res)
                this.isShow=false
                // 登录成功，跳转到首页
                //this.$router.push("college")
                
                this.$message({
                    type:"success",
                    message:"登录成功，正在跳转到页面"
                })
                this.$router.push({name:"college"})
                //保存cookes
            }).catch(err=>{
                console.log("请求失败")
                if(err.response.status===403){
                this.$message.error("账号或密登录错误:"+err.response.data.message.username+"\n"+err.response.data.message.password)
                }
                else{
                    this.$message.error("请求登录数据失败,请检查网络连接"+err.response)
                }
            })
        }
    }

}
</script>

<style>
/* html,body{cursor: url(foo.cur), url(http://www.example.com/bar.gif), auto;} */
html,body{cursor:url('../images/mouse.png'),auto}
#logo{
    background: url("../images/img5.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
}
</style>