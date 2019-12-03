<template>
  <div class="logo" v-loading.fullscreen="loading">
    <el-row>
      <el-col :span="12" :xs="24">
        
          <img @click="home" style="width: 400px; " src="logo.jpg" />
        <div v-if="showSelect" style="display:inline;font">{{collegename}}</div>
        
        
      </el-col>
      <!-- showSelect 变量来控制是否隐藏 -->
      <el-col :span="12" :xs="24">
      <el-row  v-if="showSelect" type="flex" justify="end" >
        
        <!-- 如果年度数据为0，就是没有年度数据，显示按钮请求数据重新请求导航数据 -->
        <el-button @click="requestNav" v-if="years.length==0">请求导航数据</el-button>
        <!-- 年度选择 -->
        <el-select v-model="year" v-on:change="selectYear">
          <el-option v-for="item in years" :key="item" :label="item + '年度'" :value="item"></el-option>
        </el-select>

        <!-- 学期选择 -->
        <el-select v-model="term" v-on:change="selectYear">
          <el-option
            v-for="item in terms"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-cascader placeholder="进入班级界面" :options="classes" @change="intoClass"></el-cascader>
      </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { store } from "../store.js";
import { college } from "../api/testdata";
import { EventBus } from "../event-bus.js";
import { get, post } from "../api/http.js";
import { apiLogin, apiLogoNav } from "../api/api.js";
import { ClassData } from "../api/testclassdata.js";
import { StudentData } from "../api/teststudent";
import { arrayFill } from "../utils/tools.js";
export default {
 name:'app-logo',
 mounted(){
      EventBus.$on("hideLogo",(show)=>{
            console.log("接受是否loggo:"+show)
            this.showSelect=show;
        })
        EventBus.$on("requestData",(from)=>{
            console.log(`来自:${from}的请求重新加载数据事件`)
            // 先请求导航里的数据
            this.requestNav()
        })
 },
  //请求年度数据，顺便验证登录
  created(){
   
    console.log("创建logo组件.......")
    
    this.$router.afterEach((to,from)=>{
      console.log("全局after each")
      //跳转到某个路由后，更新数据
    })
    this.$router.beforeEach((to, from, next) => {
      console.log("Logo.vue beforeEach....." + this.$router.currentRoute.name);
      next();
    });
  },
  computed: {
    // 获取学院名字
    collegename()
    {
      console.log("获取学院名字...")
      console.log(this.$route.params)
      if(Object.keys(this.$route.params).indexOf("collegeid")!=-1)
      {
      return this.$route.params['collegeid'];
      }
      else
      return ""
    }

  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter....");
    console.log(to);
  },
  methods: {
    // 请求导航数据,包括所有年度和班级列表
    requestNav() {
      // 显示全局加载条
      this.loading = true;
      // 学年数据,包括所有年份,这个年度的所有班级，
      apiLogoNav({
        college:this.collegename
      })
        .then(res => {
          this.loading = false;
          //请求成功有，设置图表
          console.log("请求logo导航数据成功!!");
          console.log(res);
          // 设置班级的数据
          arrayFill(this.classes, res.data.classes);
          // 设置年度选择框的数据
          arrayFill(this.years, res.data.years);
          console.log("组件的班级...");
          console.log(this.classes);
          // 默认选择请求到的年的第0个
          this.year = this.years[0];
          // 请求学院或者班级的数据
          this.selectYear();
        })
        .catch(err => {
          this.loading = false;
          this.showFailDialog("加载年度和班级列表数据失败!!", this.requestNav);
          // 加载失败也继续 请求数据
          this.selectYear();
        });
    },
    //跳转到首页
    home() {
      this.$router.push({
        name: "data"
      });
    },
    // 班级选择器的回调事件
    intoClass(value, value2) {
      console.log("进入班级:" + value);
      // 组成完整的id
      let id = value.join("");
    // 刷新班级时替换路由参数
       this.$route.params["classid"]=id;
      this.$router.push({
        name: "class",
        params: {
          classid: id
        }
      });
      //this.selectYear()
    },
    //请求数据
    //选择年度 或者 学期事件 ,具体请求哪个数据，根据当前的路由决定
    selectYear() {
      this.showSelect = true;
      console.log("当前路由:");
      console.log(this.$router.currentRoute);
      //根据当前路由的不同，请求不同的数据
      console.log("选择的year:" + this.year + " term:" + this.term);
      store.setYear(this.year);
      store.setTerm(this.term);
      this.loading = true;
      //模拟延迟
        if (this.$router.currentRoute.name == "college") {
          this.requestCollege();
        } else if (this.$router.currentRoute.name == "class") {
          //获取当前路由的参数，传给请求数据函数
          let classid = this.$router.currentRoute.params["classid"];

          this.requestClass(classid);
        } else if (this.$router.currentRoute.name == "student") {
          
          this.requestStudent(
            this.$router.currentRoute.params["studentid"],
            this.$router.currentRoute.params["classid"]
          );
        }
        //什么都不是
        //选择的
        else {
          this.loading = false;
        }
      },
    // 显示加载失败对话框,各个界面的统一使用,retryCallback为点击重试按钮后重新执行的函数
    showFailDialog(message, retryCallback) {
      this.$confirm(message, "加载数据失败", {
        confirmButtonText: "重试",
        cancelButtonText: "显示测试数据",
        callback: action => {
          console.log("开始重试...");
          console.log(action);
          // 如果点击了重试按钮
          if (action == "confirm") {
            if (retryCallback != undefined) retryCallback();
          }
        }
      });
    },
    requestCollege() {

      post("/api/collage", {
        college:this.collegename,
        year: store.state.year,
        term: store.state.term
      })
        .then(res => {
          console.log("请求学院数据成功:..");
          console.log(res);
          this.loading = false;
          // 测试数据和请求的后台数据结构一样，直接合并，后台有的直接替换，没有的显示为测试数据
          Object.assign(college, res);
          EventBus.$emit("collegeDataLoad", college);
        })
        .catch(err => {
          console.warn("请求学院界面数据失败,发送测试数据...>>>");
    
          this.showFailDialog("获取学院数据失败:\n" + err, this.selectYear);
          //设置成测试数据
          //发送事件
          this.loading = false;
          // 请求失败也显示测试数据
          EventBus.$emit("collegeDataLoad", college);
        });
    },
    requestClass(classid) {
      console.log("-------------------请求班级数据------------------");
      post("/api/banji", {
        college:this.collegename,
        classid: classid,
        year: store.state.year,
        term: store.state.term
      })
        .then(res => {
          console.log("请求班级数据:..");
          console.log(res);
          this.loading = false;
          Object.assign(ClassData, res);
          EventBus.$emit("classDataLoad", ClassData);
        })
        .catch(err => {
          console.log("请求数据失败>>>");
          console.log(err);
          //设置成测试数据
          //发送事件
          this.loading = false;
          EventBus.$emit("classDataLoad", ClassData);
          this.showFailDialog("获取班级数据失败:\n" + err, this.selectYear);
        });
    },
    requestStudent(studentid, classid) {
      console.log("请求学生数据....");
      console.log(this.$route.params);

            post("/api/geren",{
              college:this.collegename,
              stu_id:studentid,year:store.state.year,term:store.state.term,classid:classid}).then(res=>{
              console.log("请求个人的数据:..")
              console.log(res)
              console.log(typeof res)
              
              
               this.loading=false
               //StudentData
               Object.assign(StudentData,res)
              EventBus.$emit("studentDataLoad",StudentData)
            }).catch(err=>{
            this.$alert(err,"服务器响应失败",{
            confirmButtonText:"确定"
          })
              console.log("请求数据失败>>>----------")
              console.log(err)
              this.showFailDialog("获取学生数据失败:\n"+err,this.selectYear)
               this.loading=false
              //设置成测试数据
             EventBus.$emit("studentDataLoad",StudentData)
            })
        }
    
  },
  data() {
    return {
      //是否显示选择框
      showSelect: false,
      loading: false,
      year: store.state.year,
      term: store.state.term,
      // 班级
      classes: [
        {
          label: "17",
          value: "17",
          children: [
            { label: "大数据", value: "bigdata" },
            { label: "云计算", value: "clound" }
          ]
        },
        {
          label: "18",
          value: "18",
          children: [
            { label: "大数据", value: "bigdata" },
            { label: "云计算", value: "clound" }
          ]
        }
      ],

      years: [],
      terms: [
        {
          value: "term1",
          label: "第一学期"
        },
        {
          value: "term2",
          label: "第二学期"
        },
        {
          value: "year",
          label: "年度"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>