<template>

    <div >
    
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
            <el-form :model="login" :rules="rules" ref="loginForm">
                <el-form-item :error="errors.username" label="用户名" prop="username" >
                    <el-input v-model="login.username"></el-input>
                </el-form-item>

                <el-form-item :error="errors.password" label="密码" prop="password">
                    <el-input v-model="login.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  v-on:click="submitLogin" size="medium">立即登录</el-button>
                </el-form-item>
                <a  href="#" @click="register()">没有账号?立即注册领取豪华大礼包</a>
            </el-form>
        </el-card>
        </el-col>
        </el-row>
            
        <!-- </el-dialog> -->


    
    </div>
    
</template>

<script>

import {apiLogin,apiYears} from '../api/api.js'

//引入event-bus
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
            //设置错误的显示信息，不定义也可以显示，但登录失败返回的信息要手动设置，所有要指定才能设置
            errors:{
                username:"",
                password:""
            },
        // 定义表单的规则
        rules:{
            username:[
                {required:true,message:"请输入用户名", trigger: 'blur'}
            ],
            password:[
                {required:true,message:"请输入密码", trigger: 'blur'},
                {min:8,max:8,message:"长度为8到16位", trigger: 'blur'   }
            ]
        },

        isShow:true,
        //设置登录的表单，对应el-table里的model属性
        login:{
         username:"jojo",   
         password:"jojojojo"
        }

        }
    },
    methods:{
        register(){
            this.$router.replace({name:'register'})
        },
        startLogin(){
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
                window.setTimeout(() => {
                    // this.$router.push({name:"college"})
                }, 3000);
               
                //保存cookes
            }).catch(err=>{
                console.log("请求失败")
                console.log(err)
                 let data = err.data
                 if(err.status==403)
                this.$message({
                    type:"error",
                    message:"登录,请检查用户名或密码"
                })
                else{
                  this.$message({
                    type:"error",
                    message:"登录失败,请检查网络连接"
                })  
                }
            })
        },
        //打开登录按钮
        openLogin(){
            this.isShow=true
        },
        submitLogin(){
            console.log("提交登录....")
            this.$refs['loginForm'].validate((valid)=>{
                if(valid)
                {
                    //表单规则验证成功，开始登录
                    this.startLogin()
                }
                else
                {
                    //表单验证失败
                }
            })
           




        }
    }

}
</script>

<style>
/* html,body{cursor: url(foo.cur), url(http://www.example.com/bar.gif), auto;} */
html,body{cursor:url('../images/mouse.png'),auto}
/* #logo{
    background: url("../images/img5.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
} */
</style>