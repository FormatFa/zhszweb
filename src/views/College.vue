<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <!-- 卡片 -->
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div v-for="o in 4" :key="o">{{'列表内容 ' + o }}</div>
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
        <v-chart class="chart" autoresize :options="test" ></v-chart>
      </el-col>
    </el-row>



    <!-- 第三行 -->
    <el-row>

      <el-col :span="8">
        <v-chart class="chart" autoresize :options="scattertest"> </v-chart>
      </el-col>

      <!-- 各学年变化趋势 -->
      <el-col :span="16">
        <v-chart  class="chart" autoresize :options="scattertest"> </v-chart>
      </el-col>

    </el-row>


  </div>
</template>

<script>
export default {
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
      topdata:topdata,
      test: {
        title: { text: "tset" },
        xAxis: {
          data: ["a", "b", "c"]
        },
        yAxis: {},
        series: {
          type: "bar",
          data: [1, 2, 3]
        }
      },
      pietest: {
        title: { text: "pie" },
        series: {
          type: "pie",
          data: [{ name: "测试", value: 12 }, { name: "解决", value: 10 }]
        }
      }




    ,scattertest:{

       title: { text: "tset" },
        xAxis: {
        },
        yAxis: {},
        series: {
          type: "scatter",
          data: scatter
        }
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