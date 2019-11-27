<template>
  <div>

    <!-- 第一行 -->
    <el-row :gutter="40" >
      <!-- 卡片 -->
      <el-col :span="5" :xs="24" >
          <!-- cardtext设置 文字的样式-->
            <el-card body-style="padding:26px">
          <div slot="header">
            <span>{{this.stateStore.year}}年度总平均分</span>
          </div>
          <div class="cardtext">{{data.basicCard.year_score}}</div>
        </el-card >
        <el-card body-style="padding:26px">
          <div slot="header">
            <span>{{this.stateStore.year}}年度第一学期平均分</span>
          </div>
          <div class="cardtext">{{data.basicCard.term1_score}}</div>
        </el-card>
          <el-card body-style="padding:26px">
          <div slot="header">
            <span>{{this.stateStore.year}}年度第二学期平均分</span>
          </div>
          <div class="cardtext">{{data.basicCard.term2_score}}</div>
        </el-card>
  
        
        
        <!-- 设置顶部那个20px  -->
        <!-- <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>其他情况</span>
          </div>
          <div>1</div>
          <div> 2 </div>
        </el-card> -->
      </el-col>
        <!-- 饼图 -->
        
      <el-col :span="8" :xs="24">
        <el-card>
          <!-- tooltip 设置鼠标在元素上时显示帮助信息 -->
           <el-tooltip class="item" effect="dark" content="点击饼图块切换不同指标的数据" placement="bottom">
      <v-chart  class="chart" autoresize  ref="index" v-on:pieselectchanged="indexChange"></v-chart>
    </el-tooltip>
        </el-card>
      </el-col>
      <!-- 1.2 top5柱状图  -->
      <el-col :span="11" :xs="24" >
         <el-card>
        <v-chart  @click="intoClass" class="chart" ref="classtop" autoresize ></v-chart>
         </el-card>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row :gutter="40" style="margin-top: 25px;">  
      <!-- top 50表格  -->
      <el-col :span="5" :xs="24">
         <el-card body-style="padding:12px">
        <div style="text-align:center;font-weight:bold">{{this.stateStore.year}} 年度 {{this.stateStore.termName()}} {{this.nowIndex}} TOP50 学生</div>
        <el-table :data="studenttop50" height="400">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="score" label="分数"></el-table-column>
      </el-table>
       </el-card>
      </el-col>
      
      <!-- 分数分布柱状图 -->
      <el-col  :span="8" :xs="24">
         <el-card body-style="padding:30px">
        <v-chart class="chart" ref="range" autoresize ></v-chart>
         </el-card>
      </el-col>
<!-- 散点图 -->
      <el-col :span="11" :xs="24">
        <el-card body-style="padding:30px">
          <v-chart class="chart"  ref="gpa_score" autoresize > </v-chart>
        </el-card>
        
      </el-col>
    </el-row>



    <!-- 第三行 -->
    <el-row :gutter="15" style="margin-top: 25px;" >

      <!-- 各学年变化趋势 -->
      <el-col :span="13" :xs="24">
        <el-card>
        <v-chart  ref="trend" class="chart" autoresize > </v-chart>
         </el-card>
      </el-col>

    </el-row>


  </div>
</template>


<script>
// 学院界面
import {store} from '../store.js'
import {EventBus} from '../event-bus.js'
import {college} from '../api/testdata.js'
export default {
  //vue生命周期函数
  //组件创建时
  created(){

  
  },
  // 组件挂载了
  mounted(){
    console.log("挂载 mounted...")
    
    //监听 请求到数据后，将数据设置到页面上
    EventBus.$on("collegeDataLoad",data=>{
      console.log("学院界面请求到数据...")
      // 保存数据
      this.data=data
      // 设置饼图的初始化指标，其他跟他联动的图一开始也是平均分这个指标，点击就切换成其他的
      this.nowIndex='平均分'
      // 设置指标饼图
      this.setIndex()
      // 设置top的班级
      this.set_classtop()
      // 设置gpa散点图
      this.set_gpa_score()
      // 设置分数范围
      this.set_range()
      // 设置趋势
      this.set_trend()
      //隐藏所有图表的加载动画
      this.hideLoad()
      
    })

  //显示加载数据和初始化图表
  this.showLoad()
  //发送请求给Logo组件，请求学院数据,请求响应后再上面的监听里可用监听
  EventBus.$emit("requestData","学院")
  },
  name: "College",
  methods:{
    //柱状图点击进入班级事件
    intoClass(params){
      console.log("进入班级..")
    // 传递班级的名字作为参数
    this.$router.push({
        name:"class",
        params:{
          classid:params.name,
          collegeid:"大数据与人工智能学院"

        }
      })

    },
    //调用加载
    showLoad(){
       Object.keys( this.$refs).forEach(key => {
        this.$refs[key].showLoading()
      })},

    hideLoad(){
        //遍历所有图表组件实例，调用隐藏加载
       Object.keys( this.$refs).forEach(key => {
        this.$refs[key].hideLoading()
      })
    },
    //饼图选择事件
    indexChange(event){
        console.log("选择饼图:"+event.name)

        //获取已经选择的指标，没有就是默认平均分
        let now="平均分";
        //获取那个是选择了的,
        for(let index in event.selected)
        {
          if(event.selected[index]==true)
          {
            now=index;
          }
        }

        console.log("选择的指标:"+now)
        this.nowIndex=now;
        //更新设置班级top图表
        this.set_classtop()
    },

    //设置班级图表top数据
    set_classtop(){
     console.log("设置班级top数据:"+this.nowIndex)
      let chart = this.$refs['classtop'];
      
      if(Object.keys(this.data['top']).indexOf(this.nowIndex)==-1)
      {
        console.warn("设置班级top图失败,"+this.nowIndex+"不存在")
        return;
      }
      let classes = this.data['top'][this.nowIndex]['classes']
      let names = [];
      let scores = [];
      classes.forEach(element => {
        names.push(element['name'])
        scores.push(element['score'])
        
      });
      // 倒序，这样显示柱子就是从大到小
      names=names.reverse()
      scores = scores.reverse();

      //查看当前选择的饼图，饼图选择是什么就显示对应的数据
      let option= {
        title: { text: `${this.stateStore.year} 年度 ${this.stateStore.termName()} ${this.nowIndex} TOP5班级` },
        tooltip:{},
       
        grid:{
          left:'20%'
        },
        xAxis: {
          type:"value",
          name:"分数",
          boundaryGap :false,
          axisTick:{
            interval :0
          },
          axisLabel:{
            interval:0
          }

        },
        yAxis: {
          name:"班级",
          type:"category",
          data: names

        },
        series: {
          type: "bar",
          data: scores

        }
      }
      chart.mergeOptions(option);
      
    },
    //区间图表
    set_range(){
      let ranges = this.data['range']['ranges']
      let term1_scores = this.data['range']['term1_scores']
      let term2_scores = this.data['range']['term2_scores']
      let option = {
        tooltip:{
          formatter:function (params) {
            let dataIndex= params.dataIndex;
            let color=params.color;
            return `<div style="color:${color}">▲</div>第一学期:`+term1_scores[dataIndex]+`<div style="color:${color}">▼</div>第二学期:`+term2_scores[dataIndex]+`<div style="color:${color}">●</div>总和:`+(term1_scores[dataIndex]+term2_scores[dataIndex])
            
          }
        },
          title:{text:`${this.stateStore.year} 年度综合素质总分各区间分布`},
          xAxis:{
            data:ranges,
            name:"分数区间",
            axisLabel:{
              interval:0
            }
          },
          yAxis:{
            name:"个数/人"
          },
          legend:{
            right:0
          },
          series:[
           { 
             stack:"总和",

             name:"第一学期",
             type:"bar",
            data:term1_scores
           },
           { 

             stack:"总和",
             name:"第二学期",
             type:"bar",
            data:term2_scores
           }
          ]
      }

      this.$refs['range'].mergeOptions(option)

    },
  //gpa成绩关系
    set_gpa_score(){ 
   
      let gpa_scores = []
      for(let i =0 ;i<this.data['gpa_score']['gpas'].length;i+=1)
      {
        gpa_scores.push([
          this.data['gpa_score']['gpas'][i],
          this.data['gpa_score']['scores'][i]
        ])
      }
      let option={
          backgroundColor:"white",
        tooltip:{},
       title: { text:"GPA成绩与综合素质总分的关系" },
        xAxis: {
          name:"GPA"
        },
        yAxis: {
          name:"综合素质总分"
        },
        series: {
          type: "scatter",
          data: gpa_scores
        }
        }
    this.$refs['gpa_score'].mergeOptions(option)
    },
    // 设置趋势图
    set_trend(){

      let chart = this.$refs['trend']
      let option={
         backgroundColor:"white",
        tooltip:{},
         title:{text:"学院各年平均分变化"},
      xAxis:{
        name:"年度",
        boundaryGap:false,
        data:this.data['trend']['years'],
      },
      yAxis:{
        name:"综合平均分"
      },
      legend:{},
      series:
      [
       {
         stack:"年度",
         name:"第一学期",
         type:'line',
         data:this.data['trend']['term1'],
         areaStyle:{
         }
       },
       {
         stack:"年度",
         name:"第二学期",
         type:'line',
         data:this.data['trend']['term2'],
         areaStyle:{
         }
       }
      ]
      }
      
      chart.mergeOptions(option)
    },
    //各个指标测评分均分（饼图联动）
    setIndex()
    {
      console.log("setIndex:设置饼图")
      let piedata = [];
      for(let i =0;i<this.data.indexes.indexes.length;i+=1)
      {
        // 不要平均分的
        if(this.data.indexes.indexes[i]=="平均分")
        continue
        piedata.push({
          name:this.data.indexes.indexes[i],
          value:this.data.indexes.scores[i]
        })
      }
      let option={ 
        tooltip:{},
  
        title: { text: `${this.stateStore.year} 年度 ${this.stateStore.termName()}  各项指标平均分数` },
        series: {
             label:{
          show:true,
           formatter:"{b}({d}%)"
        },
          type: "pie",
          // 单选模式
          selectedMode:"single",
          // 思想政治	身心健康	创新创业	技术技能	志愿服务	人文艺术	综合素质理论
          data:piedata
        }}
      let chart=this.$refs['index']
      chart.mergeOptions(option)

    }
  },
  computed:{
    //表格的数据，用计算属性 , nowIndex改变，这里的也会改变
    studenttop50()
    {
      console.log("更新Top 50 表格:now index:"+this.nowIndex)
      if(  Object.keys( this.data['top']).indexOf( this.nowIndex)==-1 )
      {
        console.log("当前指标不存在:"+this.nowIndex);
        return;
      }
      // 如果没有，一开始没请求数据时是没有的
       let students = this.data['top'][this.nowIndex]['students']
       return students;
    }
  },
  data() {
    return {
      //当前饼图的选择
      nowIndex:"平均分",
      stateStore:store.state,
      //学院数据,默认是测试数据
      data:college

    };
  }
};
</script>

<style scoped>
/* 卡片文字样式 */
.cardtext {
color:red;font-size:30px;
}
.chart {
width: 100%;
}
</style>