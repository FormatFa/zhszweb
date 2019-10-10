<template>
  <div>
    <!-- 第一行 -->
    <el-row type="flex" justify="center" align="center">
      <!-- 卡片 -->
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div>2019年度总平均分:10</div>
          <div>2019年度第一学期平均分:10</div>
          <div>2019年度第二学期平均分:12↑</div>
        </el-card>
        
        <!-- 设置顶部那个20px  -->
        <el-card style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>其他情况</span>
          </div>
          <div>abcd</div>
          <div>efg  </div>
        </el-card>
      </el-col>

      <!-- 1.2 top5柱状图  -->
      <el-col :span="8">
        <v-chart  class="chart" autoresize :options="test"></v-chart>
      </el-col>

      <el-col :span="6">
        <v-chart  class="chart" autoresize :options="pietest"></v-chart>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row>  
      <!-- top 50表格  -->
      <el-col :span="8"><el-table :data="topdata" height="300">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="score" label="分数"></el-table-column>
      </el-table></el-col>
      
      <!-- 分数分布柱状图 -->
      <el-col :span="16">
        <v-chart class="chart" autoresize :options="rangeOption" ></v-chart>
      </el-col>
    </el-row>



    <!-- 第三行 -->
    <el-row>

      <el-col :span="8">
        <v-chart class="chart" autoresize :options="scattertest"> </v-chart>
      </el-col>

      <!-- 各学年变化趋势 -->
      <el-col :span="16">
        <v-chart  class="chart" autoresize :options="trendOption"> </v-chart>
      </el-col>

    </el-row>


  </div>
</template>

<script>

export default {

  //生命周期函数

  //组件创建时
  created(){
    console.log("创建组件..create....")
  },
  mounted(){
    console.log("挂载 mounted...")
  },
  name: "College",
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
        name:"平均分"
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

<style>
.chart {
width: 100%
}
</style>