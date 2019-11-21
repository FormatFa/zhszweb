<template>
  <div>
    <el-row>
      <el-col>
             <el-select @change="openCollege" v-model="selectCollege"  placeholder="打开可视化界面">
                <el-option v-for="college in storeState.colleges" :key="college" :label="college" :value="college"></el-option>
              </el-select>
  <!-- <router-link :to="{name:'college'}"> <el-button @click="truncateFiles">跳转到可视化界面</el-button>  </router-link> -->
         <el-button @click="truncateFiles">一键清空表</el-button>
      </el-col>
    </el-row>
    <!--  -->
    <el-row :gutter="40">
      <!-- 上传接口1  -->
      <el-col :span="10"  v-if="false">
        <el-card>
          <div slot="header">
            <span>综合素质数据文件管理</span>

            <!-- 设置在右边 -->
            <el-date-picker
              style="float:right;"
              @change="changeYear"
              v-model="year"
              type="year"
              placeholder="选择学年度"
            ></el-date-picker>
            <div style="float:right;">选择指定年度的数据</div>
          </div>

          <div>数据文件管理，每个年度对应三个年级,每个年级2个学期，共6个数据文件</div>
          <!-- 显示全部的表格 -->
          <el-table :data="files" :row-class-name="fileStateClassName">
            <!-- 指定列 -->
            <el-table-column label="学院" prop="college"></el-table-column>
            <el-table-column label="年度" prop="year"></el-table-column>
            <el-table-column :formatter="formatGrade" label="年级" prop="grade"></el-table-column>
            <el-table-column :formatter="formatTerm" label="学期" prop="term"></el-table-column>
            <el-table-column label="记录数" prop="count"></el-table-column>
            <el-table-column :formatter="formatState" label="状态" prop="state"></el-table-column>
            <!-- 设置每一行都有的操作 -->
            <el-table-column label="操作">
              <!-- 通过scope.row可以获取到表格的某行数据 -->
              <template slot-scope="scope">
                <el-upload
                  :on-success="uploadOk"
                  :on-error="uploadNotOk"
                  action="/api/data/upload"
                  :data="getUploadPostData(scope.row)"
                  :show-file-list="false"
                >
                  <el-button type="text">上传数据</el-button>
                </el-upload>
                <el-button
                  v-if="scope.row.state==1"
                  type="text"
                  @click="parseFile(scope.row)"
                >解析数据到数据库</el-button>
                <el-button type="text" @click="deleteFile(scope.row)">删除记录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

<!-- 上传接口2 -->
      <el-col :span="14" :xs="20">      
        <el-card>
          <div slot="header">
            <span>已经上传的数据</span>
            <div style="float:right">
              <div style="display:inline;padding-right:20px;" >用户名:{{storeState.login.username}}</div>
              <el-button type="success" @click="qiandao">每日签到领金币</el-button>
              <!-- 修改密码 -->
              <el-button type="warning" @click="dialogVisible = true">修改登录密码</el-button>
              <el-dialog title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                          <el-form size="medium">
                        <el-form-item  label="原密码" prop="password1">
                    <el-input placeholder="原密码" v-model="reg.password1" show-password> </el-input>
                    </el-form-item>
                    <el-form-item  label="新密码" prop="password2">
                    <el-input placeholder="密码" v-model="reg.password2" show-password> </el-input>
                </el-form-item>
                <el-form-item   label="确认新密码" prop="password3">
                    <el-input placeholder="密码" v-model="reg.password3" show-password> </el-input>
                </el-form-item>
                          </el-form>

                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changgg">确 定</el-button>
                        </span>
                        </el-dialog>
              <el-button type="danger" @click="logout">退出登录</el-button>
               </div>
            
            
          </div>
          <span>上传新数据</span>

          <el-row>
                <el-col :span="4">
              <el-select v-model="upload.college" placeholder="选择学院">
                <el-option v-for="college in storeState.colleges" :key="college" :label="college" :value="college"></el-option>
              </el-select>
            </el-col>
            <!-- 选择年度 -->
            <el-col :span="4">
              
              <el-date-picker v-model="upload.year" type="year" placeholder="选择年度"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-select v-model="upload.grade" type="year" placeholder="选择年级">
                <el-option
                  :label="year.label"
                  :value="year.value"
                  v-for="year in uploadYears"
                  :key="year.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="upload.term">
                <el-option label="第一学期" value="term1"></el-option>
                <el-option label="第二学期" value="term2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-upload
                :limit="1"
                :multiple="false"
                ref="uploadNew"
                :auto-upload="false"
                :data="uploadData"
                action="/api/data/upload"
                :on-success="uploadOk"
                :on-error="uploadNotOk"
                :on-change="uploadChange"
                
              >
                <el-button slot="trigger">选择对应的Excel文件</el-button>
                <el-button @click="submitUploadNew">上传数据</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-table :data="uploaded" :row-class-name="fileStateClassName">
            <el-table-column label="学院" prop="college"></el-table-column>
            <el-table-column label="年度" prop="year"></el-table-column>
            <el-table-column :formatter="formatGrade" label="年级" prop="grade"></el-table-column>
            <el-table-column  :formatter="formatTerm" label="学期" prop="term"></el-table-column>
            <el-table-column  :formatter="formatState" label="状态" prop="state"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteFile(scope.row)">删除数据</el-button>
                <el-button v-if="scope.row.state==1" @click="parseFile(scope.row)">解析数据</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

    


      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  apiParse,
  apiTruncate,
  apiFiles,
  apiDelete,
  apiUploaded
} from "../api/dataApi.js";

import { Loading } from "element-ui";
import { arrayFill ,errorDialog } from "../utils/tools.js";
import {apiLogout,apiUserInfo,apiUserchange} from '../api/api.js'
import {store} from '../store.js'
import { college } from '../api/testdata';

export default {
  // 组件名称,在调试时有用
  name: "datamanage",


  data() {
    return {
      selectCollege:"",
      
      reg:{
         password1:"",
         password2:"",
         password3:"",
      },
      dialogVisible: false,
      storeState:store.state,
      // 接口2的 用来和选择框
      upload: {
        // 这个选择后变成Date对象
        year: "",
        grade: "",
        term: "",
        college:"大数据与人工智能学院"
      },
      // 上传文件时附带的数据,点击上传后根据upload对象里的各个值设置uploadData的内容再提交
      uploadData: {},
      // 已上传的数据列表

      uploaded: [],
      // 接口1
      // 当前选择的日期，默认选择2019年度的
      year: new Date(2019, 11, 11),
      // 没数据时显示的测试
      files: [
        {
          college: "测试",
          year: "2018"
        }
      ]
      
    };
  },

  // 组件created时请求2019的数据
  created() {
           console.log("组件创建...")
    // 请求用户信息
    apiUserInfo().then(res=>{
      console.log("获取用户登录信息...")
      console.log(res)
    //  设置用户信息
    console.log("设置用户名:"+res.data.username)
    store.setUserName(res.data.username);
    }).catch(err=>{
      console.log("获取用户信息出错:")
      console.log(err)
    })
    // 请求两个接口的数据
    this.switchYear(2019);
    this.requestUpload();
 
  },
  computed: {
    // 选择某个年度后，学期也是确定的,2017年度只有三个学期 17级16级15级
    uploadYears() {
      if (this.upload.year === "") return [];
      console.log(this.upload.year + typeof this.upload.year);
      let year = this.upload.year.getFullYear();
      let result = [];
      for (let j = year; j > year - 3; j -= 1) {
        result.push({
          label: j + "级",
          value: j + ""
        });
      }

      return result;
    }
  },
  methods: {
    openCollege(value)
    {
      console.log("打开学院:",value)
      this.$router.push({
        name:"college",
        params:{
          collegeid:value
        }
        

      })
    },
    qiandao(){
      this.$message({
        message:"签到成功,金币+10",
        type:"warning"
      })
    },
    
    changgg(){
      if(this.reg.password2!=this.reg.password3){
        this.$message({
          showClose: true,
          message: '密码不一致',
          type: 'error'
        });
        return
      }
      this.dialogVisible=false
      console.log("调用监听修改密码")
      apiUserchange({
          username:this.storeState.login.username,
          old_password:this.reg.password1,
          password:this.reg.password2,
          password2:this.reg.password3,
      }).then(res=>{
        
        console.log("请求成功..")
        console.log(res)
        if(res.code==0)
        {
        this.$message({
          showClose: true,
          message: '密码修改成功,跳转到登录界面',
          type: 'success'
        });
        this.$router.push({
          name:'login'
        })
        }
        else
        this.$message({
          showClose: true,
          message: '密码失败:'+res.msg,
          type: 'error'
        });
      }).catch(err=>{
        console.log("请求失败.")
      })
    },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    ,
    logout(){
      apiLogout().then(res=>{
        if(res.code==0){
        this.$message({
          message:"登出成功!"
        })
        this.$router.push({
          name:'login'

        })
        }
        else{
            errorDialog(this,res.msg)
        }
      }).catch(err=>{})

    },
    // 接口1 提交数据
    submitUploadNew() {
      console.log("上传数据...");
      if(this.upload.year==""){
        this.$message("年度没有选择!!")
        return
      }
      // 设置附加参数
      this.uploadData["year"] = this.upload.year.getFullYear();
      this.uploadData["grade"] = this.upload.grade;
      this.uploadData["term"] = this.upload.term;
      this.uploadData["college"] = this.upload.college;
      this.$refs.uploadNew.submit();
    },
    // 获取已上传数据
    requestUpload() {
      apiUploaded()
        .then(res => {
          console.log("获取已上传的数据:");
          console.log(res);
          if(res.code==0)
          arrayFill(this.uploaded, res.data);
          else
          this.$alert(res.data,"失败",{
            confirmButtonText:"确定"
          })
        })
        .catch(err => {
          console.log("获取已上传的数据失败");
        });
    },
    // 格式化年级输出，2017只输出 17级这样的
    formatGrade(row, column, cellValue, index) {
      if(!cellValue)return "null"
      if (cellValue.length == 4) return cellValue.substring(2, 4) + "级";
      else return cellValue;
    },
    // 格式化学期输出
    formatTerm(row,column,cellValue,index){
      if(cellValue=="term1")return "第一学期"
      else if(cellValue=="term2")return "第二学期"
      else
      return cellValue
    },
    // 格式化状态码,将数字转换成文字
    formatState(row,column,cellValue,index){
        if(cellValue==0)
        return "未上传"
        else if(cellValue==1)
        return "未解析"
        else if(cellValue==2)
        return "解析完成"
    },
    // 清空表，测试使用
    truncateFiles() {
      apiTruncate()
        .then(res => {
          console.log("清空表成功..");
          this.switchYear(this.year.getFullYear());
        })
        .catch(err => {
          console.log("清空表失败..");
        });
    },
    // 清空数据，清空某个文件的数据，并删除文件
    deleteFile(param) {
      let postparam = {
        // 学年
        year: param.year,
        // 年级
        grade: param.grade,
        // 学期
        term: param.term,
        college:param.college
      };
       Loading.service({ text: "删除数据文件和数据库里的记录....", fullscreen: true });
      apiDelete(postparam)
        .then(res => {
              Loading.service({ fullscreen: true }).close();
          console.log("ffff")
          console.log(res)
         
          if(res.code==0){
          this.$message({ type: "success", message: "清空数据成功:"+res.msg });
          // 删除成功刷新数据
          this.switchYear(this.year.getFullYear());
          }
          else
          {
            this.$alert(res.msg, "删除数据失败", {
            confirmButtonText: "确定"
          });
          }
        })
        .catch(err => {
              Loading.service({ fullscreen: true }).close();
          console.log(err)
          this.$alert(err.data, "服务器响应失败,清空数据失败", {
            confirmButtonText: "确定"
          });
        });
    },
    // 解析文件,post解析数据的路由
    parseFile(param) {
      console.log("解析数据:");
      console.log(param);
      // 时间较长，显示全屏进度条
      Loading.service({ text: "解析数据到数据库中....", fullscreen: true });
      let postparam = {
        // 学年
        year: param.year,
        // 年级
        grade: param.grade,
        // 学期
        term: param.term,
        college:param.college
      };
      apiParse(postparam)
        .then(res => {
          // 请求完成，关闭进度条
          Loading.service({ fullscreen: true }).close();
          console.log(res);
          // 返回200,再判断错误无码
          if (res.code != 0) {
            this.$alert(res.msg, "服务器响应上传失败", {
              confirmButtonText: "确定"
            });
          } else {
            this.$message({ type: "success", message: "解析成功" });
          }
          this.switchYear(this.year.getFullYear());
        })
        .catch(err => {
            this.$alert( "捕捉到异常:"+err,"解析错误", {
              confirmButtonText: "确定"
            });
          Loading.service({ fullscreen: true }).close();
        });
    },
    
    // 上传成功回调
    //提示消息
    uploadOk(response, file, fileList) {
      if (response.code != 0) {
        this.$alert(response.msg, "服务器响应上传失败", {
          confirmButtonText: "确定"
        });
      } else {
        this.$message({
          type: "success",
          message: "上传成功"
        });
      }
      this.switchYear(this.year.getFullYear());
      this.$refs.uploadNew.clearFiles();
    },
    // 上传失败回调
    uploadNotOk(err, file, fileList) {
      console.log("上传文件不成功...");
      console.log(err);
      this.$alert(err, "上传失败", {
        confirmButtonText: "确定"
      });
      this.$refs.uploadNew.clearFiles();
    },
    // 文件状态改变添加文件，上传成功，上传失败都会调用，这里设置个逻辑，上传成功后尝试解析文件名，获取出年度年级数据
    uploadChange(file,fileList){
      console.log("文件状态改变:")
      console.log(file)
      console.log(fileList)
      // 因为都会触发，如果长度是1就是，添加的，上传的fileList变成0
      if(fileList.length==1)
      {
        let name = fileList[0].name
        console.log("添加文件名:"+name)
        // 正则查找文件名里的数据
        let grade_pattern =/(\d+)级/g
        let term_pattern= /第(.)学期/g
        let year_pattern=/(\d{4})-\d{4}/g
        let grade=grade_pattern.exec(name)
        let term = term_pattern.exec(name)
        let year = year_pattern.exec(name)
        console.log("尝试在文件名里查找参数:"+grade)
        console.log(term)
        console.log(year)
        // 如果三个都查找到就切换
        if(grade.length==2&&term.length==2&&year.length==2)
        {
          term = term[1]
          if(term=="一")term="term1"
          else if(term=="二")term="term2"
          grade=grade[1]
          year = year[1]
          this.$message({
            type:"success",
            message:`文件名里获取年度等数据成功,年度:${year} 年级:${grade} 学期:${term}`
          })
          this.upload.grade=grade
          this.upload.term = term
          this.upload.year = new Date(year,1,1)
        }
        else
        {
          this.$message({
            type:"error",
            message:"文件名里获取年度等数据失败，请手动选择"
          })
        }

      }
    },
    // 接口1-------------------
    // 获取post时顺便上传上去的数据，上传，el-upload用到，这里提交过去的是表单形式的
    getUploadPostData(row) {
      return {
        year: row.year,
        grade: row.grade,
        term: row.term
      };
    },
    // 行的样式，根据状态码的不同显示不同的背景颜色
    fileStateClassName(row, rowIndex) {
      if (row.row.state == 0) return "file-no-upload";
      else if (row.row.state == 1) {
        return "file-ok";
      }
    },
    // 改变选择年度时,重新请求数据
    changeYear(date) {
      this.switchYear(date.getFullYear());
    },
    // 0未上传 1以上
    switchYear(year) {
      this.requestUpload();
      // apiFiles({
      //   year: year
      // })
      //   .then(res => {
      //     console.log("请求文件列表成功...");
      //     // 清空原本的表格数据
      //     this.files.splice(0, this.files.length);
      //     // 插入请求回来的
      //     res.forEach(element => {
      //       this.files.push(element);
      //     });
      //   })
      //   .catch(err => {
      //     this.$alert(err, "请求已上传的文件列表失败", {
      //       confirmButtonText: "ok"
      //     });
      //     console.log("请求文件列表失败");
      //   });
      console.log("选择年份:" + year);
      //
    },
    // 接口1 上传文件件
    submitUpload() {
      this.$refs.upload.submit();
    }
    // success() {
    //   console.log("上传数据成功!");
    // },
    // error() {
    //   this.$message("上传数据失败...");
    // }
  }
};
</script>


<style >
/* 没上传文件的表格颜色 */
.el-table .file-no-upload {
  background: oldlace;
}
.el-table .file-ok {
  background: #f0f9eb;
}
</style>