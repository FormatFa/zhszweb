<template>
  <div>

    <!-- 第一行 -->
    <el-row >
      <!-- 卡片 -->
      <el-col :span="5" :xs="20" style="margin-top: 80px">
        <el-card  v-bind:style="{ backgroundColor:'#0f4c95' }">
          <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div>{{this.stateStore.year}}年度总平均分:{{data.basicCard.year_score}}</div>
          <div>{{this.stateStore.year}}年度第一学期平均分:{{data.basicCard.term1_score}}</div>
          <div>{{this.stateStore.year}}年度第二学期平均分:{{data.basicCard.term2_score}}</div>
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

      <!-- 1.2 top5柱状图  -->
      <el-col :span="8" :xs="20"  style="margin-left: 120px">
        <v-chart  @click="intoClass" class="chart" ref="classtop" autoresize ></v-chart>
      </el-col>
    <!-- 饼图 -->
      <el-col :span="6"  style="margin-left: 120px">
        <v-chart  theme="dark" class="chart" autoresize  ref="index" v-on:pieselectchanged="indexChange"></v-chart>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row>  
      <!-- top 50表格  -->
      <el-col :span="8">
        <div style="text-align:center;font-weight:bold">{{this.stateStore.year}} 年度 {{this.stateStore.termName()}} {{this.nowIndex}} TOP50 学生</div>
        <el-table :data="studenttop50" height="300">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="score" label="分数"></el-table-column>
      </el-table></el-col>
      
      <!-- 分数分布柱状图 -->
      <el-col :span="16">
        <v-chart class="chart" ref="range" autoresize ></v-chart>
      </el-col>
    </el-row>



    <!-- 第三行 -->
    <el-row>

      <el-col :span="8">
        <v-chart class="chart"  ref="gpa_score" autoresize > </v-chart>
      </el-col>

      <!-- 各学年变化趋势 -->
      <el-col :span="16">
        <v-chart  ref="trend" class="chart" autoresize > </v-chart>
      </el-col>

    </el-row>


  </div>
</template>

<script>
import {store} from '../store.js'
import {EventBus} from '../event-bus.js'
import {college} from '../api/testdata.js'
export default {
  //vue生命周期函数
  //生命周期函数

  //组件创建时
  created(){

    

  },
  mounted(){
    console.log("挂载 mounted...")
    
    //监听事件
        
    EventBus.$on("collegeDataLoad",data=>{
      console.log("学院界面请求到数据...")
      console.log(data)
      this.data=data
      this.setIndex()
      this.set_classtop()
      this.set_gpa_score()
      this.set_range()
      this.set_trend()
      //隐藏加载
      this.hideLoad()
      
    })
  //显示加载数据和初始化图表
  this.showLoad()
  //发送请求给Logo组件，请求学院数据
  EventBus.$emit("requestData","学院")
  },
  name: "College",
  methods:{
    //柱状图点击进入班级
    intoClass(params){
      console.log("进入班级..")
      console.log(params)
      console.log(params.name)
    this.$router.push({
        name:"class",
        params:{
          classid:params.name
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

        //获取已经选择的指标，没有就是默认总和
        let now="平均分";
        //获取那个是选择了的
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

    set_studenttop(){
      let students = this.data['top'][this.nowIndex]['students']
    },
    //设置班级图表top数据
    set_classtop(){
      let chart = this.$refs['classtop'];
      let classes = this.data['top'][this.nowIndex]['classes']
      let names = [];
      let scores = [];
      let ids = [];
      classes.forEach(element => {
        names.push(element['name'])
        scores.push(element['score'])
        
      });
      //查看当前选择的饼图，饼图选择是什么就显示对应的数据
      let option= {
        title: { text: `${this.stateStore.year} 年度 ${this.stateStore.termName()} ${this.nowIndex} TOP5班级` },
        tooltip:{},
       
        grid:{
          left:'20%'
        },
        xAxis: {
          type:"value",
          name:"分数"
        },
        yAxis: {
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
        tooltip:{},
          title:{text:`${this.stateStore.year} 年度综合素质总分各区间分布`},
          xAxis:{
            data:ranges
          },
          yAxis:{},
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
    set_gpa_score(){
        //gpa成绩关系
      let gpa_scores = []
      for(let i =0 ;i<this.data['gpa_score']['gpas'].length;i+=1)
      {
        gpa_scores.push([
          this.data['gpa_score']['gpas'][i],
          this.data['gpa_score']['scores'][i]
        ])
      }
      let option={
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
    set_trend(){

      let chart = this.$refs['trend']
      let option={
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
           color:{
                 type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 1, color: 'black' // 0% 处的颜色
    }, {
        offset: 0, color: '#18aec9' // 100% 处的颜色
    }],
    global: false // 缺省为 false
           }
           
         }
       },
       {
         stack:"年度",
         name:"第二学期",
         type:'line',
         data:this.data['trend']['term2'],
         areaStyle:{
           color:{
                 type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 1, color: 'black' // 0% 处的颜色
    }, {
        offset: 0, color: "#644a94" // 100% 处的颜色
    }],
    global: false // 缺省为 false
           }
         }
       }
      ]
      }
      console.log("趋势..")
      console.log(option)
      chart.mergeOptions(option)
    },
    //各个指标测评分均分（饼图联动）
    setIndex()
    {
      console.log("设置饼图")
      console.log(this.data)
      let piedata = [];
      for(let i =0;i<this.data.indexes.indexes.length;i+=1)
      {
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
          // formatter:"{a}{d}"
        },
          type: "pie",
          // 单选模式
          selectedMode:"single",
          // 思想政治	身心健康	创新创业	技术技能	志愿服务	人文艺术	综合素质理论
          data:piedata
        }}

      console.log(option)
      
      let chart=this.$refs['index']
      console.log(chart)

      chart.mergeOptions(option)

    }


    //设置

  },
  computed:{
    //表格的数据，用计算属性 , nowIndex改变，这里的也会改变
    studenttop50()
    {
       let students = this.data['top'][this.nowIndex]['students']
       return students;
    }
  },
  data() {
    
    let topdata = [];
    let scatter=[];
    for(let i = 0;i<50;i+=1)
    {
      topdata.push({
        name:"小明"+i,
        score:i*2+1
      })
      scatter.push([i,i*2+4])
    
    }
    return {
      //当前饼图的选择
      nowIndex:"平均分",
      stateStore:store.state,
      //学院数据
      data:college,
      //区间
      rangeOption:{
          title:{text:"xx年度综合素质总各分区间次数分布"},
          xAxis:{
            data:["(0-10]","(10-20]","(20-30]"]
          },
          yAxis:{},
          legend:{
            right:0
          },
          series:[
           { 
             name:"第一学期",
             type:"bar",
            data:[20,40,45]
           },
           { 
             name:"第二学期",
             type:"bar",
            data:[10,20,5]
           }
          ]
      },
      topdata:topdata,
      test: {
        title: { text: "xx年度第y学期 某指标 TOP5班级" },
        xAxis: {
          type:"value"
        },
        yAxis: {
          type:"category",
          
          data: ["a", "b", "c"]

        },
        series: {
          type: "bar",
          data: [1, 2, 3]

        }
      },
      pietest: {
        title: { text: "xx年度第y学期 各项指标平均分数" },
        series: {
          type: "pie",
          // 思想政治	身心健康	创新创业	技术技能	志愿服务	人文艺术	综合素质理论

          data: [{ name: "思想政治", value: 12 }, { name: "身心健康", value: 10 },{ name: "创新创业", value: 80 },{ name: "技术技能", value: 19 },{ name: "志愿服务", value: 15 },{ name: "人文艺术", value: 25 },{ name: "综合素质理论", value: 2 } ]
        }
      }




    ,scattertest:{

       title: { text:"GPA成绩与综合素质总分的关系" },
        xAxis: {
          name:"GPA"
        },
        yAxis: {
          name:"综合素质总分"
        },
        series: {
          type: "scatter",
          data: scatter
        }
    },
    //变化趋势
    trendOption:{
      title:{text:"学院各年平均分变化"},
      xAxis:{
        name:"年度",
        data:["17","18","19","20"]
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
         data:[1,3,4,1],
         areaStyle:{}
       },
       {
         stack:"年度",
         name:"第二学期",
         type:'line',
         data:[2,4,2,1],
         areaStyle:{}
       }
      ]
    }








    };
  }
};
</script>

<style scoped>
.chart {
width: 100%;
border: 2px solid #0f4c95;
box-shadow:0 0 13px #000 inset;


}
el-table {
  border: 2px solid #0f4c95;
box-shadow:0 0 13px #000 inset;

}
</style>