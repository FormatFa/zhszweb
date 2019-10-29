<template>
  <div>

      <el-row >
          <el-col :span="4" :xs="0">
              <el-carousel height="1000px">
                  <el-carousel-item>
                      <img src="/01-1.jpg"  >
                  </el-carousel-item>
                    <el-carousel-item>
                     <img src="/01-3.jpg"  >
                  </el-carousel-item>
                   <el-carousel-item>
                      <img src="/01-4.jpg" >
                  </el-carousel-item>
              </el-carousel>
          </el-col>

          <el-col :span="20" :xs="24">


            
            <el-row type="flex" justify="center">
                <el-col :span="6">
                            <div style="font-size:44px;margin-bottom: 20px;">欢迎注册</div>
<div style="font-size:28px;margin-bottom: 64px;">每一天,乐在沟通<div style="color:#359eff;float:right;">
            
            </div></div>
      
                     <el-form>
                    <el-form-item :error="errors.username" label="用户名" prop="username">
                    <el-input placeholder="用户名" v-model="reg.username"> </el-input>
                    </el-form-item>
                    <el-form-item :error="errors.password" label="密码" prop="password">
                    <el-input placeholder="密码" v-model="reg.password"> </el-input>
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
           

          </el-col>
      </el-row>

  </div>
</template>

<script>
import {apiRegister} from '../api/api.js'
export default {
    // 注册用户
    methods:{
        submit(){
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
                let data = err.data
                console.log("注册失败:")
                console.log(data)
                this.$message({
                    type:"error",
                    message:"注册失败"
                })
                if(data.message.username !== undefined)
               {
                     let temp = data.message.username.join(",");
                    if(temp.indexOf('already exists!'))
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
                password:"jojo"
            },

            reg:{
                username:"jojo",
                password:"jojojojo"
            }
        }
    }

}
</script>

<style>

</style>