<template>

    <div id=login>
        <el-row type="flex" justify="center">
            <el-col   :span="5" :xs="20" style="margin-top: 200px" >
            <el-form :model="login" :rules="rules" ref="loginForm" size="medium">
                <el-form-item :error="errors.username" label="用户名" prop="username" >
                    <el-input v-model="login.username" ></el-input>
                </el-form-item>

                <el-form-item :error="errors.password" label="密码" prop="password">
                    <el-input v-model="login.password"  show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  v-on:click="submitLogin" size="medium">立即登录</el-button>
                </el-form-item>
                <a  href="#" @click="register()">没有账号?</a>
            </el-form>
       
        </el-col>
        </el-row>
    </div>
    
</template>

<script>

import {apiLogin,apiYears} from '../api/api.js'

//引入event-bus
import {EventBus} from '../event-bus.js'
import { Loading } from "element-ui";
export default {
    
    name:"login",
    mounted(){
     

    },
    beforeRouteUpdate(){
  
    },
    created(){
        console.log("create....")
        EventBus.$on("showLogin",()=>{
            this.isShow=true
        })
        console.log("发送隐藏")
      EventBus.$emit('hideLogo',false);  
    },//用于隐藏logo的选择框
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
                {min:8,max:16,message:"长度为8到16位", trigger: 'blur'   }
            ]
        },

        isShow:true,
        //设置登录的表单，对应el-table里的model属性
        login:{
        //  username:"jojo",   
        //  password:"jojojojo"
        }

        }
    },
    methods:{
        register(){
            this.$router.replace({name:'register'})
        },
        
        startLogin(){
            Loading.service({ text: "正在登录....", fullscreen: true });
             apiLogin({
                username:this.login.username,
                password:this.login.password
            }).then(res=>{
                Loading.service({ fullscreen: true }).close();
                console.log("请求成功")
                console.log(res)
                this.isShow=false
                // 登录成功，跳转到首页
                //this.$router.push("college")
                if(res.code==0)
                {
                    this.$message({
                    type:"success",
                    message:"登录成功，正在跳转到页面"
                })
               this.$router.push({name:"data"})
                }
                else{
                    console.log("登录返回非0")
                    let data=res.data;
                    console.log(data)
                        if(data.username !== undefined)
               {
                     let temp = data.username.join(",");
                    if(temp.indexOf('Invalid username')!=-1)
                    this.errors.username="无效的用户名"
               }
                 if(data.password !== undefined)
                  {
                     //转换成中文
                    let temp = data.password.join(",");
                    console.log(temp)
                    if(temp.indexOf("Incorrect password!")!=-1)
                        this.errors.password="密码错误!"
                 }
                }
             
               
                //保存cookes
            }).catch(err=>{
                Loading.service({ fullscreen: true }).close();
                console.log("请求失败")
                console.log(err)
                 let data = err.response.data
                 if(err.response.status==403)
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
/* 鼠标图标的改变 */
html,body{cursor:url('../images/mouse.png'),auto}
/* 定义背景图案 */
#login{
    background: url("../images/ba8bd4e0f53dbde0eedb58c571a98202.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%
}
</style>