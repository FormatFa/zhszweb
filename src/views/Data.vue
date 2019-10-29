<template>
  <div>
    <!-- <el-row :gutter="40">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>【综合素质数据】</span>
          </div>
          <div>记录数:1000</div>
          <div>共有x年数据</div>
          <el-upload
            drag
            @on-error="error"
            @on-success="success"
            ref="upload"
            action="/api/upload"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button @click="submitUpload">上传</el-button>
        </el-card>
      </el-col>

      <el-col :span="8"></el-col>
    </el-row> -->

    <el-row>
   
      <div class="container">
        <div class="block">
          <el-date-picker  @change="changeYear" v-model="year" type="year" placeholder="选择学年度"></el-date-picker>
        </div>
      </div>
    </el-row>

    <el-row>
        <el-col :span="15">

              <el-table
      :data="files"
      :row-class-name="fileStateClassName"
      >
          <el-table-column label="学院" prop="college"></el-table-column>
          <el-table-column label="年度" prop="year"></el-table-column>
          <el-table-column label="年级" prop="grade"></el-table-column>
          <el-table-column label="学期" prop="term"></el-table-column>
          <el-table-column label="记录数" prop="count"></el-table-column>
          <el-table-column label="状态" prop="state"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-upload
                
                :on-success="uploadOk"
                :on-error="uploadNotOk"
                action="/api/folder/upload"
                :data="getUploadPostData(scope.row)"
                >
                    <el-button type="text">{{ uploadText(scope.row.stateCode) }}</el-button>
                </el-upload>

                  <el-button type="text">清空数据</el-button>
              </template>
          </el-table-column>

      </el-table>
        </el-col>
        <!-- 学年对应的数据列表 -->
  
    </el-row>
  </div>
</template>

<script>
import { apiData } from "../api/api.js";
export default {
  name: "datamanage",
  created() {
    console.log("组件创建...");
    //请求数据
    apiData()
      .then(res => {
        console.log("请求成功..");
      })
      .catch(err => {
        console.log("请求失败.");
      });
  },
  data(){
      return {
        year:"2019",
          files:[
              {
                college:"测试",
                year:"2018",
              }
          ]
      }
  },
  computed:{
   
  },
  methods: {
     uploadText(state)
    {
      if(state==0)
      return "上传数据"
      else if(state==1)
      {
        return "解析数据到数据库"
      }
      else
      return "???"
    },
    uploadOk(response, file, fileList){
      if(response.code!=0)
      {
          this.$alert(response.msg,"上传失败",{
            confirmButtonText:"确定"
          })
      }
      else{
          this.$message({
        type:"success",
        message:"上传成功"})
      }
      
      
    },
    uploadNotOk(err, file, fileList){
      console.log("上传文件不成功...")
      this.$message("上传不成功")
    },

    // 获取post时顺便上传上去的数据，上传
    getUploadPostData(row){
      return {
        year:row.year,
        grade:row.grade,
        term:row.term

      }
    },
    fileStateClassName(row,rowIndex){
      console.log(row)
      if(row.state=="未上传")
      {
        return "file-no-upload"
      }
      else
      return ""
    },
    // 0未上传 1以上
    changeYear(year){
      let fyear= year.getFullYear()
      console.log("选择年份:"+fyear)
      this.files.splice(0,this.files.length)

      for(let i=fyear;i>fyear-3;i-=1)
      {
        
        this.files.push({
          year:fyear,
           college:"测试",
                grade:(i+"").substring(2),
                term:"第一学期",
                state:"未上传",
                stateCode:0
             

        });
         this.files.push({
           year:fyear,
           college:"测试",
                grade:(i+"").substring(2),
                term:"第二学期",
                state:"已上传",
                stateCode:1
        });
      }


    },
    // 上传文件件
    submitUpload() {
      this.$refs.upload.submit();
    },
    success() {
      console.log("上传数据成功!");
    },
    error() {
      this.$message("上传数据失败...");
    }
  }
};
</script>


<style scoped>
/* 没上传文件 */
.el-table .file-no-upload {
  background: goldenrod
}
.file_ok {
  background: green;
}
</style>