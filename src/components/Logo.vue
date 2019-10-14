<template>
  <div v-loading.fullscreen="loading">
      <el-row >
        <el-col  :span="8">
          <img  style="width: 100%;height: 60px" src="/logo.jpg"/>
        </el-col>
      
      <el-row  type="flex" justify="end" :span="10" >
          <el-button @click="login()">登录</el-button>

          <!-- 年度选择 -->
          <el-select v-model="year" v-on:change="selectYear">
            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <!-- 学期选择 -->
          <el-select v-model="term" v-on:change="selectYear">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <el-cascader
          placeholder="进入班级界面"
            :options="classes"
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

import {ClassData} from '../api/testclassdata.js'
export default {
  computed:{
    
  },
  methods:{
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
        },2000)
      

    },
    requestCollege(){
            get("xxx").then(res=>{
            console.log("请求学院数据:..")
            console.log(res)
        }).catch(err=>{
            console.log("请求数据失败>>>")
            console.log(err)
            //设置成测试数据
            //发送事件
            this.loading=false
            EventBus.$emit("collegeDataLoad",college)
        })
    },
        requestClass(){
            get("xxx").then(res=>{
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
    }
    
  },
  data(){
    return {
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
      {
        value:"2018",
        label:"2018年度"
        
      },
      {
        value:"2019",
        label:"2019年度"
      }
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