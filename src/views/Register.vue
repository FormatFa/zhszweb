<template>
  <div id=bg>
            <el-row type="flex" justify="center" style="margin-right:100px; margin-top: 110px">
                <el-col :span="5" :xs="20">
                            <div style="font-size:44px;margin-bottom: 20px;">欢迎注册</div>
<div style="font-size:28px;margin-bottom: 64px;">每一天,乐在沟通<div style="color:#359eff;float:right;">
            
            </div></div>
      
                     <el-form size="medium">
                    <el-form-item :error="errors.username" label="用户名" prop="username">
                    <el-input placeholder="用户名" v-model="reg.username"> </el-input>
                    </el-form-item>
                    <el-form-item :error="errors.password" label="密码" prop="password">
                    <el-input placeholder="密码" v-model="reg.password" show-password> </el-input>
                </el-form-item>
                <el-form-item :error="errors.password2" label="确认密码" prop="password2">
                    <el-input placeholder="密码" v-model="reg.password2" show-password> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" @click="submit()" size="medium">立即注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>我已阅读并同意相关服务条款和隐私政策</el-checkbox><img onclick="" src="/favicon.ico"/>
                </el-form-item>
            </el-form>
                  
                </el-col>
            </el-row>

  </div>
</template>

<script>

import {apiRegister} from '../api/api.js'
import {EventBus} from '../event-bus.js'
export default {
   
    name:"bg",
    created(){
         EventBus.$emit('hideLogo',false); //隐藏logo的选择框
    },
    // 注册用户
    methods:{
        
        submit(){
            if(this.reg.password!=this.reg.password2){
                this.errors.password2="两次密码不一样";
                return;
            }
            apiRegister( {
                username:this.reg.username,
                password:this.reg.password
            }).then(res=>{
                console.log("注册结果:")
                console.log(res)
                  this.$message({
          showClose: true,
          message: '注册成功，正在跳转到登录界面...',
          type: 'success'
            });
            this.$router.replace({
                name:"login"
            })


            }).catch(err=>{
                console.log(err)
                let data = err.response.data
                console.log("注册失败:")
                console.log(data)
                this.$message({
                    type:"error",
                    message:"注册失败"
                })
                if(data.message.username !== undefined)
               {
                     let temp = data.message.username.join(",");
                    if(temp.indexOf('already exists!')!=-1)
                    this.errors.username="用户名已存在"
               }
                 if(data.message.password !== undefined)
                  {
                     //转换成中文
                    let temp = data.message.password.join(",");
                    if(temp=="Field must be between 8 and 16 characters long.")
                this.errors.password="密码必须在8到16各长度之间"
                 }
      
              
            })
        }
    },
    data(){
        return {
            //表单的错误信息
            errors:{
                    username:"jojo",
                password:"jojo",
                password2:"",
            },

            reg:{
                username:"jojo",
                password:"jojojojo",
                password2:"jojojojo",
            }
        }
    }

}
</script>

<style>
/* 设置背景图案 */
* #bg{
    background: url("../images/44ce51cbfee3ac0249cd771f2ad9a7c2.jpg");
    background-size:cover;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    width: 100%
}
</style>