<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="truncateFiles">一键清空表</el-button>
      </el-col>
    </el-row>
    <!--  -->
    <el-row>
      <el-col :span="10">
        <el-card>
          <div slot="header">
            <span>综合素质数据管理</span>
          
            <!-- 设置在右边 -->
            <el-date-picker
              style="float:right;"
              @change="changeYear"
              v-model="year"
              type="year"
              placeholder="选择学年度"
            ></el-date-picker>
              <div style="float:right;">选择数据年份</div>
          </div>

          <el-table  :data="files" :row-class-name="fileStateClassName">
            <el-table-column label="学院" prop="college"></el-table-column>
            <el-table-column label="年度" prop="year"></el-table-column>
            <el-table-column label="年级" prop="grade"></el-table-column>
            <el-table-column label="学期" prop="term"></el-table-column>
            <el-table-column label="记录数" prop="count"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <!-- 设置每一行都有的操作 -->
            <el-table-column label="操作">
              <!-- 通过scope.row可以获取到表格的某行数据 -->
              <template slot-scope="scope">
                <el-upload
                
                  :on-success="uploadOk"
                  :on-error="uploadNotOk"
                  action="/api/folder/upload"
                  :data="getUploadPostData(scope.row)"
                  :show-file-list="false"
                >
                  <el-button type="text">上传数据</el-button>
                </el-upload>
                <el-button
                  v-if="scope.row.statecode==1"
                  type="text"
                  @click="parseFile(scope.row)"
                >解析数据到数据库</el-button>
                <el-button type="text" @click="deleteFile(scope.row)">删除记录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 学年对应的数据列表 -->
    </el-row>
  </div>
</template>

<script>

import { apiParse, apiTruncate, apiFiles, apiDelete } from "../api/dataApi.js";
import { Loading } from "element-ui";
export default {
  // 组件名称,在调试时有用
  name: "datamanage",

  // 组件创建时
  created() {
    console.log("组件创建...");
  },
  data() {
    return {
      // 当前选择的日期，默认选择2019年度的
      year: new Date(2019, 11, 11),
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
    this.switchYear(2019);
  },
  computed: {},
  methods: {
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
        term: param.term
      };
      apiDelete(postparam)
        .then(res => {
          this.$message({ type: "success", message: "清空数据成功" });
          // 删除成功刷新数据
          this.switchYear(this.year.getFullYear());
        })
        .catch(err => {
          this.$alert(err.data, "服务器响应失败,清空数据失败", {
            confirmButtonText: "确定"
          });
        });
    },
    // 解析文件
    parseFile(param) {
      console.log("解析数据:");
      console.log(param);
      // 时间较长，显示全屏进度条
      Loading.service({ text:"解析数据到数据库中....",fullscreen: true });
      let postparam = {
        // 学年
        year: param.year,
        // 年级
        grade: param.grade,
        // 学期
        term: param.term
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
          Loading.service({ fullscreen: true }).close();
        });
    },
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
    },
    uploadNotOk(err, file, fileList) {
      console.log("上传文件不成功...");
      // this.$message("上传不成功")
      console.log(err);
      this.$alert(err, "上传失败", {
        confirmButtonText: "确定"
      });
    },

    // 获取post时顺便上传上去的数据，上传，el-upload用到，这里提交过去的是表单形式的
    getUploadPostData(row) {
      return {
        year: row.year,
        grade: row.grade,
        term: row.term
      };
    },
    fileStateClassName(row, rowIndex) {
      console.log(row);
      console.log(row.statecode)
      if(row.row.statecode==0)
      return "file-no-upload";
      else if(row.row.statecode==1)
      {
        return "file-ok"
      }
    },
    changeYear(date) {
      this.switchYear(date.getFullYear());
    },
    // 0未上传 1以上
    switchYear(year) {
      apiFiles({
        year: year
      }).then(res => {
          console.log("请求文件列表成功...");
          // 清空原本的表格数据
          this.files.splice(0, this.files.length);
          // 插入请求回来的
          res.forEach(element => {
            this.files.push(element);
          });
        })
        .catch(err => {
          this.$alert(err, "请求文件列表失败", {
            confirmButtonText: "ok"
          });
          console.log("请求文件列表失败");
        });
      console.log("选择年份:" + year);
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


<style >
/* 没上传文件 */
.el-table .file-no-upload {
  background: oldlace;
}
.el-table .file-ok {

  background:  #f0f9eb;
}
</style>