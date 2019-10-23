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
            免费靓号
            </div></div>
      
                     <el-form>
                    <el-form-item label="用户名">
                    <el-input placeholder="用户名" v-model="reg.username"> </el-input>
                    </el-form-item>
                    <el-form-item label="密码">
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
            apiRegister({
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
            }).catch(err=>{
                console.log("注册失败:")
                console.log(err)
            })
        }
    },
    data(){
        return {

            reg:{
                username:"jojo",
                password:"jojo"
            }
        }
    }

}
</script>

<style>

</style>