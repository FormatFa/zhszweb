<template>

    <div>
        
        <el-dialog
        title="登录"
        :visible.sync="isShow"
        >
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
        </el-dialog>


    <el-carousel>
        <el-carousel-item>
            <img src="/img1.jpg"/>
        </el-carousel-item>
            <el-carousel-item>
            <img src="/img2.jpg"/>
        </el-carousel-item>
    </el-carousel>

    </div>
    
</template>

<script>
// 测试页面
import {apiLogin} from '../api/api.js'
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
                this.isShow=false
            }).catch(err=>{

                console.log("请求失败")
                this.$message.error("请求数据失败,请检查网络连接")

            })
        }
    }

}
</script>

<style>
img {
    
}
</style>