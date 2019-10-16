<template>
  
    <div>

        <el-row>

            <el-col :span=8>
                <el-card>
                    <div slot="header">
                        <span>【综合素质数据】概览</span>
                    </div>
                    <div>
                        记录数:1000
                    </div>
                      <div>
                        共有x年数据
                    </div>
                </el-card>
            </el-col>


      <el-col :span=8>
             
                    
                        <span>上传新数据</span>
                    
                        <el-upload
                        drag
                        @on-error="error"
                        @on-success="success"
                        ref="upload"
                        action=""
                        :auto-upload="false"
                        >
                        <el-button style="float: right; padding: 3px 0" type="text">选择文件</el-button>
                        </el-upload>
                        <el-button @click="submitUpload">上传</el-button>
        
            </el-col>

        </el-row>


    </div>

</template>

<script>
export default {
    name:"datamanage",
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