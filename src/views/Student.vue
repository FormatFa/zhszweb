<template>
  <div>
    <!-- 第一行 -->
    <el-row :gutter="40">
      <!-- 个人的基本情况卡片 -->
      <el-col :span="12">
        <el-card  body-style="padding:34px">
          <div slot="header" class="clearfix">
            <span style="font-size:25px">个人第一学期的基本情况</span>
          </div>
          <div style="font-size:20px">第一学期综合素质分:{{data.studentCard1.term1_avlscore}}</div>
          <div style="font-size:20px">第一学期综合素质全院排名:{{data.studentCard1.term1_yranking}}</div>
          <div style="font-size:20px">第一学期综合素质全班排名:{{data.studentCard1.term1_cranking}}</div>
        </el-card>
         <el-card  body-style="padding:34px">
          <div slot="header" class="clearfix">
            <span style="font-size:25px">个人第二学期的基本情况</span>
          </div>
          <div style="font-size:20px">第二学期综合素质分:{{data.studentCard2.term2_avlscore}}</div>
          <div style="font-size:20px">第二学期综合素质全院排名:{{data.studentCard2.term2_yranking}}</div>
          <div style="font-size:20px">第二学期综合素质全班排名:{{data.studentCard2.term2_cranking}}</div>
        </el-card>
      </el-col>
      <!-- 雷达图 -->
      <el-col :span="12" :xs="24">
        <el-card>
        <v-chart class="chart" ref="scuhindexscore" autoresize>
           <!-- 用ref定义一个变量名字，在下面调用 -->
        </v-chart>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 第二行 -->
    <el-row :gutter="40" style="margin-top: 25px;">
      <!-- 各个指标在全院的排名 -->
      <el-col :span="12" :xs="24">
        <el-card >
        <div style="font-size:20px">各个指标在全院的排名</div>
        <el-table :data="CollegeData"  fit  align="center">
          <el-table-column prop="Collegindex" label="各指标" width="180"></el-table-column>
          <el-table-column prop="Collegscores" label="分数" width="180"></el-table-column>
          <el-table-column prop="Collegranking" label="排名" width="180"></el-table-column>
        </el-table>
        </el-card>
      </el-col>
      <!-- 各个指标在全班的排名 -->
      <el-col :span="12" :xs="24">
        <el-card >
         <div style="font-size:20px">各个指标在全班的排名</div>
        <el-table :data="ClassData"  fit align="center">
          <el-table-column prop="Classindex" label="各指标" width="180"></el-table-column>
          <el-table-column prop="Classscores" label="分数" width="180"></el-table-column>
          <el-table-column prop="Classranking" label="排名" width="180"></el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row>
      <!-- 建议 -->
      <el-col>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="建议" name="1">
            <div>{{proposal}}</div>
            <div>{{proposal2}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { StudentData } from "../api/teststudent.js";
import { store } from "../store.js";
import { EventBus } from "../event-bus.js";

export default {
  name: "student",
  mounted() {
    EventBus.$on("studentDataLoad", data => {
      console.log("个人界面请求数据");
      console.log(data);
      this.data = data;
       //调用定义的变量
      this.set_suchindexscore();
      this.hideLoad();

      let score = 0;
      let indexs=['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论']//用于建议卡片调用
      //通过判断各指标的循环对比得出最低的指标分数给出建议
      let minIndex=0
      let temp=this.data.suchindexscores[2].value;
      for (let i=0;i<=temp.length-2;i+=1){
        if (temp[i]<temp[minIndex]){minIndex=i}
      }
      this.proposal2="你的"+indexs[minIndex]+"指标较低，有待加强"

      if (store.state.term === "term1")
        score = this.data.studentCard1.term1_avlscore;
      else score = this.data.studentCard2.term2_avlscore;
      if (score >= 0 && score <= 15) {
        this.proposal = "你的综合素质分较低，有待加强";
      } else if (score > 15 && score <= 30) {
        this.proposal = "你的综合素质分一般，应该适当加强";
      } else if (score > 30 && score <= 50) {
        this.proposal = "你的综合素质分还不错，继续加油";
      } else if (score > 50 && score <= 100) {
        this.proposal = "你的综合素质分挺好的";
      }
    });
    this.showLoad();
    //请求个人数据
    EventBus.$emit("requestData", "个人");
  },

  methods: {
    handleChange(val) {
      console.log(val);
    }, //建议
    showLoad() {
      Object.keys(this.$refs).forEach(key => {
        this.$refs[key].showLoading();
      });
    },
    hideLoad() {
      //遍历所有图表组件实例，调用隐藏加载
      Object.keys(this.$refs).forEach(key => {
        this.$refs[key].hideLoading();
      });
    },
    set_suchindexscore() {
      console.log("显示个人当前学期的雷达图");
      //循环对比的出指标的最大值，用于定义雷达的最大临界点
      let suchindexscores = this.data['suchindexscores']
      let maxvalue = -1;    
      for(let i =0;i<suchindexscores.length;i+=1)
      {
        for(let j =0;j<suchindexscores[i].value.length;j+=1)
        {
          if(suchindexscores[i].value[j]>maxvalue)
          maxvalue=suchindexscores[i].value[j]
        }
      }

      let option={
        title: { text:`${this.stateStore.termName()} 各指标雷达图` },
        tooltip:{},
         legend:{data:['学院指标平均分','班级指标平均分','学生指标分数'],right:5},
        radar:{
          shape :'circle',
          axisLine :{
            
          },
          indicator:[
                   { name: "思想政治", max: maxvalue , color:"black"},
            { name: "身心健康", max: maxvalue ,color:"red"},
            { name: "创新创业", max: maxvalue ,color:"orange"},
            { name: "技术技能", max: maxvalue ,color:"pink"},
            { name: "志愿服务", max: maxvalue ,color:"green"},
            { name: "人文艺术", max: maxvalue ,color:"blue"},
            { name: "综合素质理论", max: maxvalue ,color:"purple"}
          ]
        },
        series:[
          { name:'学院指标平均分vs班级指标平均分vs学生指标分数',
            type:"radar",
            data:suchindexscores
          }

        ]

      }
     
      console.log(option);
      this.$refs["scuhindexscore"].mergeOptions(option);//调用数据写入雷达图
    },

    set_CollegeData() {
      
      this.CollegeData.splice(0, this.CollegeData.length);
      this.data["data1"]["CollegeData"].forEach(element => {
        this.CollegeData.push(element);
      });
    },//各指标在全院的排名
    set_ClassData() {
      
      this.ClassData.splice(0, this.ClassData.length);
      this.data["data2"]["ClassData"].forEach(element => {
        this.ClassData.push(element);
      });
    }//各指标在全班的排名
  },

  computed: {
    CollegeData() {
      return this.data.data1.CollegeData;
    },
    ClassData() {
      return this.data.data2.ClassData;
    }
  },
  data() {
    return {
      proposal: [],
      proposal2:[],
      stateStore: store.state,
      data: StudentData,

     
      activeNames: ["1"]//建议卡片的监听
    };
  }
};
</script>

<style>
</style>