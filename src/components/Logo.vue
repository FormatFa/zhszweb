<template>
  <div v-loading.fullscreen="loading">
      <el-row >
        <el-col  :span="8">
          <img  @click="home" style="width: 100%;height: 60px" src="/logo.jpg"/>
        </el-col>
      
      <el-row v-if="isLogin" type="flex" justify="end" :span="10" >
          <!-- <el-button @click="login()">登录</el-button> -->

          <!-- 年度选择 -->
          <el-select v-model="year" v-on:change="selectYear">
            <el-option v-for="item in years" :key="item" :label="item + '年度'" :value="item"></el-option>
          </el-select>

          <!-- 学期选择 -->
          <el-select v-model="term" v-on:change="selectYear">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <el-cascader
          placeholder="进入班级界面"
            :options="classes"
            @change="intoClass"
          ></el-cascader>
        </el-row>

      </el-row>
  </div>
</template>

<script>
import {store} from '../store.js'
import {college} from '../api/testdata'
import {EventBus} from '../event-bus.js'
import {get,post} from '../api/http.js'
import {apiLogin,apiYears} from '../api/api.js'
import {ClassData} from '../api/testclassdata.js'
import {StudentData} from '../api/teststudent'
export default {

  //请求年度数据，顺便验证登录
  created(){
    console.log("创建logo组件.......")
    this.loading=true
    window.setTimeout(()=>{

      apiYears().then(res=>{
        //请求成功有，设置图表
        this.selectYear()
    }).catch(err=>{
      this.loading=false
      this.$message.error("请求年度数据失败。")
        console.log("请求学年失败..")
        let data={
          years:[
    '2018',
    '2019'],
    //所有班级
    classes:[{
          label:"17", value:"17", children:[
            {label:"大数据",value:"bigdata",children:[
              {
                label:"1班",value:1
              }
            ]},
            {label:"云计算",value:"clound"}
          ]
      },
      {
         label:"18",value:"18",children:[{label:"大数据",value:"bigdata"},
            {label:"云计算",value:"clound"}]
      }
      ]
        }
        //页面第一次请求
        for(let i =0;i<data.years.length;i+=1){this.years.push(data.years[i])}
        this.classes=data.classes
 this.selectYear()
    }).then(()=>{
    })



    },2000)
    

this.$router.afterEach((to,from)=>{
  console.log("全局after each")
  //跳转到某个路由后，更新数据
  this.selectYear()
})
this.$router.beforeEach((to, from, next) => {
    console.log("test....."+this.$router.currentRoute.name)
    this.isLogin= to.name!="login"
    next();
})

  },
  computed:{
 
  },
  methods:{
    home(){
 this.$router.push({
        name:"college"
      })
    },
    intoClass(value){
      console.log("进入班级:"+value)
      console.log(value)
      let id = value.join("")
      this.$router.push({
        name:"class",
        params:{
          classid:id
        }
      })
      this.selectYear()

    },
    login(){
  EventBus.$emit("showLogin",college)
    },
    //请求数据
    //选择年度 或者 学期事件
    selectYear(){
      console.log("当前路由:")
      console.log(this.$router.currentRoute)
      //根据当前路由的不同，请求不同的数据
      console.log("选择的year:"+this.year+" term:"+this.term)
      store.setYear(this.year)
      store.setTerm(this.term)
      this.loading=true;
      //模拟延迟
      window.setTimeout( ()=> {
        if(this.$router.currentRoute.name=="college")
      {
        this.requestCollege()
      }
      else if(this.$router.currentRoute.name=="class")
      {
        this.requestClass()
      }
      else if (this.$router.currentRoute.name=="student")
      {
        console.log("请求学生2")
        this.requestStudent()
      }
      //什么都不是
      //选择的
      else{
        this.loading=false
      }
        },2000)
      

    },
    requestCollege(){
            get("xxx",{
              year:"2018",
              term:"term1"
            }).then(res=>{
            console.log("请求学院数据:..")
            console.log(res)
        }).catch(err=>{
            console.log("请求数据失败>>>")
            console.log(err)
            //设置成测试数据
            //发送事件
            this.loading=false
            console.log("发送学院数据...")
            EventBus.$emit("collegeDataLoad",college)
        })
    },
        requestClass(){
            get("xxx",{}).then(res=>{
            console.log("请求班级数据:..")
            console.log(res)
        }).catch(err=>{
            console.log("请求数据失败>>>")
            console.log(err)
            //设置成测试数据
            //发送事件
            this.loading=false
            EventBus.$emit("classDataLoad",ClassData)
           
            
        })
    },
        requestStudent(){
            get("xxx").then(res=>{
              console.log("请求个人的数据:..")
              console.log(res)
            }).catch(err=>{
              console.log("请求数据失败>>>")
              console.log(err)
              //设置成测试数据
              //发送事件
              this.loading=false
              EventBus.$emit("studentDataLoad",StudentData)
            })
        }
    
  },
  data(){
    return {
      //是否登录
         isLogin:true,
      loading:false,
       year:store.state.year,
       term:store.state.term, 
      // 班级
      classes:[{
          label:"17", value:"17", children:[
            {label:"大数据",value:"bigdata"},
            {label:"云计算",value:"clound"}
          ]
      },
      {
         label:"18",value:"18",children:[{label:"大数据",value:"bigdata"},
            {label:"云计算",value:"clound"}]
      }
      ],

  
      years:[
  
    ],
      terms:[
      {
        value:"term1",
        label:"第一学期"
        
      },
      {
        value:"term2",
        label:"第二学期"
      },
      {
        value:"year",
        label:"年度"
      }
    ]


    }


  }


}
</script>

<style>

</style>