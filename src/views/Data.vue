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
   
      
     
          
        
     
    </el-row>
<el-row>
  <el-col>
    <el-button @click="truncateFiles">一键清空表</el-button>
  </el-col>
</el-row>
    <el-row>
        <el-col :span="15">
          
          <div>选择年度数据</div>
            <el-date-picker  @change="changeYear" v-model="year" type="year" placeholder="选择学年度"></el-date-picker>
              <el-table
              size="small"
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
                :show-file-list=false
                >
                    <el-button type="text">上传数据</el-button>
                </el-upload>
                  <el-button v-if="scope.row.statecode==1"  type="text" @click="parseFile(scope.row)">解析数据到数据库</el-button>
                  <el-button type="text" @click="deleteFile(scope.row)">删除记录</el-button>
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
import {apiParse,apiTruncate,apiFiles,apiDelete} from "../api/dataApi.js"
import { Loading } from 'element-ui';
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
        year:new Date(2019,11,11),
          files:[
              {
                college:"测试",
                year:"2018",
              }
          ]
      }
  },

  created(){
    this.switchYear(2019)
  },
  computed:{
   
  },
  methods: {

    truncateFiles(){
      apiTruncate().then(res=>{
        console.log("清空表成功..")
             this.switchYear(this.year.getFullYear())
      }).catch(err=>{
console.log("清空表失败..")

      })
    },
    // 清空数据，清空某个文件的数据，并删除文件
    deleteFile(param){
          let postparam = {
          // 学年
          year:param.year,
          // 年级
          grade:param.grade,
          // 学期
          term:param.term
        }
        
        apiDelete(postparam).then(res=>{
        this.$message({ type:"success", message:"清空数据成功"})
         this.switchYear(this.year.getFullYear())
        }).catch(err=>{
           this.$alert(err.data,"服务器响应失败,清空数据失败",{
            confirmButtonText:"确定"
          })
        })
    },
    // 解析文件
    parseFile(param){
        console.log("解析数据:")
        console.log(param)
        Loading.service({ fullscreen: true });
        let postparam = {
          // 学年
          year:param.year,
          // 年级
          grade:param.grade,
          // 学期
          term:param.term
        }
        apiParse(postparam).then(res=>{
            Loading.service({ fullscreen: true }).close();
          console.log(res)
          if(res.code!=0)
          {
            this.$alert(res.msg,"服务器响应上传失败",{
            confirmButtonText:"确定"
          })

          }
          else
          {
    this.$message({ type:"success", message:"解析成功"})
          }
          this.switchYear(this.year.getFullYear())
        }).catch(err=>{
       Loading.service({ fullscreen: true }).close();
        })

    },
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
          this.$alert(response.msg,"服务器响应上传失败",{
            confirmButtonText:"确定"
          })
      }
      else{
          this.$message({
        type:"success",
        message:"上传成功"})
      }
      this.switchYear(this.year.getFullYear())
      
    },
    uploadNotOk(err, file, fileList){
      console.log("上传文件不成功...")
      // this.$message("上传不成功")
      console.log(err)
      this.$alert(err,"上传失败",{
        confirmButtonText:"确定"
      })
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
    changeYear(date){
      this.switchYear(date.getFullYear())
    },
    // 0未上传 1以上
    switchYear(year){
      apiFiles({
        year:year
      }).then(res=>{
          console.log("请求文件列表成功...")
          this.files.splice(0,this.files.length)
          res.forEach(element => {
            this.files.push(element)
          });
      }).catch(err=>{
        this.$alert(err,"请求文件列表失败",{
          confirmButtonText:"ok"
        })
        console.log("请求文件列表失败")
      })
      console.log("选择年份:"+year)
      //

      

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