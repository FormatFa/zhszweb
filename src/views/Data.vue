<template>
  
    <div>

        <el-row :gutter="40">

            <el-col :span=8>
                <el-card>
                    <div slot="header">
                        <span>【综合素质数据】</span>
                    </div>
                    <div>
                        记录数:1000
                    </div>
                      <div>
                        共有x年数据
                    </div>
                        <el-upload
                        drag
                        @on-error="error"
                        @on-success="success"
                        ref="upload"
                        action="/api/upload"
                        :auto-upload="false"
                        >
                         <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <el-button @click="submitUpload">上传</el-button>

                </el-card>
            </el-col>


      <el-col :span=8>
             
                    
            
        
            </el-col>

        </el-row>


    </div>

</template>

<script>
import {apiData} from '../api/api.js'
export default {
    name:"datamanage",
    created(){
        console.log("组件创建...")
        //请求数据
        apiData().then(res=>{
            console.log("请求成功..")
        }).catch(err=>{
            console.log("请求失败.")
        })

    },
    methods:{
        // 上传文件件
        submitUpload(){
            this.$refs.upload.submit();
        },success(){
            console.log("上传数据成功!")
        },
        error(){
            this.$message("上传数据失败...")
        }
    }

}
</script>


<style>

</style>