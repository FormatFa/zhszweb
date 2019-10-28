<template>
<div>
  <!-- 第一行 -->
    <el-row >
    <!-- 卡片 -->
    <!-- 基本情况 -->
      <el-col :span="3"><el-card >
        <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div>{{data.classjbCard.classname}}</div>
          <div>人数:{{data.classjbCard.students}}</div>
      </el-card></el-col>
   <!-- 各个指标测评分的均分 雷达图 -->
   
      <el-col :span="11" style="margin-left: 90px;">
        <el-card>
        <v-chart class="chart" ref="suchindexscore"  autoresize></v-chart>
        </el-card>
      </el-col>
   
    <!-- 班级名单的下拉框 -->
    
      <el-col :span="6"><el-dropdown @command="intoStudent"  style="margin-left: 300px;">
        <el-card>
              <span class="el-dropdown-link">
          班级同学名单
          <i class="el0icon-arrow-down el-icon--right"></i>
        </span>
        </el-card>
        <el-dropdown-menu slot="dropdown">
         <el-dropdown-item  :command="people" :key="people" v-for="people in peoples">
            {{people}}
         </el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      
        </el-col>
    
  </el-row>

  <!-- 第二行 -->
   <el-row type="flex" justify="end" align="center" style="margin-top: 25px;">
     <!-- 各种关于综合素质的评分 -->
     <el-col :span="5" style="margin-right: 50px;">
       <el-card>
         <div slot="header" class="clearfix">
           <span>第一学期综合素质均分及排名</span>
         </div>
           <div>第一学期综合素质平均分:{{data.classCard.term1_score}}</div>
        <div>第一学期在全院排名:{{data.classCard.term1_paiming}}</div>
       </el-card>
       <el-card>
         <div slot="header" class="clearfix">
           <span>第二学期综合素质均分及排名</span>
         </div>
        <div>第二学期综合素质平均分:{{data.classCard.term2_score}}</div>
        <div>第二学期在全院排名:{{data.classCard.term2_paiming}}</div>
       </el-card>
     </el-col>
     <!-- 下拉框 -->
     <!-- 各指标或总分的top 柱状图 -->
     
     <el-col :span="15" style="margin-right: 10px;">
         <el-card>
       <el-select v-on:change="zhibiaochange" v-model="nowIndex"  clearable placeholder="请选择" style="margin-left: 300px;" size="small"> 
    
       <el-option
       v-for="item in options"
       :key="item.value"
       :label="item.label"
       :value="item.value"></el-option>
       </el-select>
       
       <!-- top5柱状图 -->
        <v-chart class="chart" ref="topstudent" autoresize ></v-chart>
        
  </el-card>
       </el-col>
   
       <!-- 总分区间漏斗图 -->
      <el-col :span="9" style="margin-left: 1px;">
        <el-card body-style="padding:36px" >
        <v-chart class="chart" ref="totalscores"   :options="tree3" autoresize ></v-chart>
        </el-card>
      </el-col>
     
   </el-row>


   <!-- 第三行 -->
   <!-- 建议 -->
   <el-row>
    <el-collapse v-model="activeNames" @ change="handleChange">
     <el-collapse-item title="根据在院里的排名，而给你的建议" name="1">
       <div>{{proposal}}</div>
       <div>{{proposal2}}</div>
      
     </el-collapse-item>
   </el-collapse>
   </el-row>

</div>
</template>


<script>
 import {ClassData} from '../api/testclassdata.js'
    import {store} from '../store.js'
    import {EventBus} from '../event-bus.js'
export default {
  name:'banji',
  beforeRouteEnter(to,from,next){
    console.log("before router enter")
    next()
  },
  beforeRouteUpdate(){
    console.log("班级导航更新..请求数据")
    EventBus.$emit("requestData","班级")
  },
  mounted(){
     let indexs=['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论']
      console.log("Class mounted")  
        EventBus.$on("classDataLoad",data=>{
          //关闭图表加载
          this.hideLoad()
      console.log("班级界面请求到数据...")
      console.log(data)
      this.data=data
      this.set_topstudent()
      this.set_suchindexscore()
      this.set_studentnames()
      this.set_topstudent()
      this.set_totalscores()
      let minIndex=0
      let temp=this.data.suchindexscores[1].value;
      console.log("判断索引...")
      console.log(temp)
      for(let i=0;i<temp.length-2;i+=1)
      {
          if(temp[i]<temp[minIndex])minIndex=i
      }
//temp[]
      this.proposal2="你的"+indexs[minIndex]+"指标较低,有待加强"

      let score=0
    
      if(store.state.term==="term1")
      score=this.data.classCard.term1_score;
      else
      score=this.data.classCard.term2_score;
      console.log(store.state.term+"score:"+score)
      console.log(this.data.classCard.term1_score)
      if (score>=0&&score<=15){
        this.proposal="凉了"
      }
      else if (score>15&&score<=30){
        this.proposal="勉强狗活"
      }
      else if (score>30&&score<=50){
        this.proposal="可以没毛病"
      }

    })
    this.showLoad()
    //请求数据
    EventBus.$emit("requestData","班级")
  
  },
  methods:{
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

    intoStudent(com){
      console.log("进入学生:"+com)
        store.setStudent(com)
         this.$router.push({
        name:"student",
        params:{
          studentid:com
        }
      })
    },
    zhibiaochange(value){
      console.log("改变指标")
      console.log(value)
      this.set_topstudent()
      

    },
      handleChange(val){
      console.log(val);
    },
    //设置按学期各指标的雷达图
    set_suchindexscore()
    {
    console.log("显示雷达图，当前学期")
    // let suchnames=this.data['suchindexscore']['suchnames']
    let suchindexscores=this.data['suchindexscores']
   
    let option={
      
          title:{text:`${this.stateStore.termName()} 各指标雷达图`},
        tooltip:{},
        legend:{data:['学院指标平均分','班级指标平均分'],right:0},
        radar:{name:{
          textStyle:{
            color:'#000',backgroundColor:'#999',borderRadius:3,padding:[3,5]}},
            indicator:[{name:'思想政治',max:20},
            {name:'身心健康',max:20},
            {name:'创新创业',max:20},
            {name:'技术技能',max:20},
            {name:'志愿服务',max:20},
            {name:'人文艺术',max:20},
            {name:'综合素质理论',max:20}
            ]
            },
             
            series:[{
              name:'学院指标平均分vs班级指标平均分',
            type:'radar',
            data:
suchindexscores
             
              
              }]



    }
   
    this.$refs['suchindexscore'].mergeOptions(option)
    

    }, 
    //班级名单
    set_studentnames(){
      let student=this.data['students']['student']
      this.peoples.splice(0,this.peoples.length); 
      for(let i =0;i<student.length;i+=1)
      this.peoples.push(student[i])
      
    },



    // 设置top 学生柱状图
    set_topstudent()
    {
      console.log("设置top图表，当前指标是:"+this.nowIndex)
      if( Object.keys(this.data['topstudent']).indexOf(this.nowIndex)<0 )
      {
        console.log("没有这个指标")
        return;
      }
      let names = this.data['topstudent'][this.nowIndex]['names']
      let scores = this.data['topstudent'][this.nowIndex]['scores']
      let option={
        
        title:{text:` ${this.stateStore.termName()} 柱状图`},
       color:['#00E5EE'],
       tooltip:{trigger:'axis',
       axisPointer: {
         type: 'shadow'
       }
       },
       grid:{
         left:'3%',
         right:'4%',
         bottom:'3%',
         containLabel:true
       },
       xAxis:[{
         type:'category',
         data:names,
         axisTick:{
           alignWithLabel:true
         }
       }],
       yAxis:[{
         type:'value'
       }],
       series:[{
         name:'分数是',
         type:'bar',
         barWidth:'60',
         data:scores
       }]
     }

     this.$refs['topstudent'].mergeOptions(option)
    },
    //总分区间漏斗图
    set_totalscores()
    {
      console.log("显示漏斗图，当前学期")
      let ranges=this.data['totalscores']['ranges']
      let allscores=this.data['totalscores']['allscores']
      let option={
         title:{text:`${this.stateStore.termName()}总分区间漏斗图`},
     tooltip:{trigger:'item',
     fromatter: "{a} <br/>{b} : {c}%"},
     toolbox:{
       feature:{dataView:{readOnly: false},
       restore: {},
       saveAsImage:{}
       }
     },
     
     legend:{
       data:ranges,
       bottom:0
     },
     calculable: true,
     series:[
       {
         name: '总分区间图',
         type:'funnel',
         left:'20%',
         top:60,
         bottom:60,
         width:'80%',
         min:0,
         max:50,
         minSize:'0%',
         maxSize:'100%',
         sort:'descending',
         gap:2,
         label:{
           show:true,
           position:'inside'
         },
         labelLine:{
           length:10,
           lineStyle:{
             width:1,
             type:'solid'
           }
         },
         itemStyle:{
           borderColor:'#fff',
           borderWidth:1
         },
         emphasis:{
           label:{
             fontSize:20
           }
         },
         data:allscores
       }
     ] 


      }
      console.log(this.$refs['totalscores'])
      console.log(option)
      //this.$refs['totalscores'].setOption (option)
  
      this.$refs['totalscores'].mergeOptions(option,false)
    }
  },

  data:function(){
    return{
        proposal:[],
        proposal2:"",
        stateStore:store.state,
        nowIndex:"总分",
        data:ClassData,
        peoples:["渣渣","渣渣辉"],//班级名单
        // tree1:{title:{text:'各指标雷达图'},
        // tooltip:{},
        // legend:{data:['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论']},
        // radar:{name:{
        //   textStyle:{
        //     color:'#fff',backgroundColor:'#999',borderRadius:3,padding:[3,5]}},
        //     indicator:[{name:'思想政治',max:20},
        //     {name:'身心健康',max:20},
        //     {name:'创新创业',max:20},
        //     {name:'技术技能',max:20},
        //     {name:'志愿服务',max:20},
        //     {name:'人文艺术',max:20},
        //     {name:'综合素质理论',max:20}
        //     ]
        //     },
        //     series:[{
        //       name:'思想政治vs身心健康vs创新创业vs技术技能vs志愿服务vs人文艺术vs综合素质理论',
        //     type:'radar',
        //     data:[
        //       {value:[13,8,9,10,17,10,0],name:'第一学期'
        //       }
        //       ]
        //       }]},//雷达图
      options:[{value:'思想政治',label:'思想政治Top5'},
               {value:'身心健康',label:'身心健康Top5'},
               {value:'创新创业',label:'创新创业Top5'},
               {value:'技术技能',label:'技术技能Top5'},
               {value:'志愿服务',label:'志愿服务Top5'},
               {value:'人文艺术',label:'人文艺术Top5'},
               {value:'综合素质理论',label:'综合素质理论Top5'},
               {value:'总分',label:'总分Top5'}],
               value:'',//下拉框
    //  tree2:{
    //    color:['#00E5EE'],
    //    tooltip:{trigger:'axis',
    //    axisPointer: {
    //      type: 'shadow'
    //    }
    //    },
    //    grid:{
    //      left:'3%',
    //      right:'4%',
    //      bottom:'3%',
    //      containLabel:true
    //    },
    //    xAxis:[{
    //      type:'category',
    //      data:['渣渣1','渣渣2','渣渣3','渣渣4','渣渣5'],
    //      axisTick:{
    //        alignWithLabel:true
    //      }
    //    }],
    //    yAxis:[{
    //      type:'value'
    //    }],
    //    series:[{
    //      name:'分数是',
    //      type:'bar',
    //      barWidth:'60',
    //      data:[5,6,7,9,15]
    //    }]
    //  },//柱状图
     tree3:{title:{text:'总分区间漏斗图'},
     tooltip:{trigger:'item',
     fromatter: "{a} <br/>{b} : {c}%"},
     toolbox:{
       feature:{dataView:{readOnly: false},
       restore: {},
       saveAsImage:{}
       }
     },
     
     legend:{
       data:['0-10','11-20','21-30','31-40','41-50']
     },
     calculable: true,
     series:[
       {
         name: '总分区间图',
         type:'funnel',
         left:'10%',
         top:60,
         bottom:60,
         width:'80%',
         min:0,
         max:50,
         minSize:'0%',
         maxSize:'100%',
         sort:'descending',
         gap:2,
         label:{
           show:true,
           position:'inside'
         },
         labelLine:{
           length:10,
           lineStyle:{
             width:1,
             type:'solid'
           }
         },
         itemStyle:{
           borderColor:'#fff',
           borderWidth:1
         },
         emphasis:{
           label:{
             fontSize:20
           }
         },
         data:[
           {value:20,name:'0-10'},
           {value:9,name:'11-20'},
           {value:8,name:'21-30'},
           {value:7,name:'31-40'},
           {value:4,name:'41-50'}
         ]
       }
     ]
     },//漏斗图
    activeNames:[1]
    }
  }

}
</script>

<style>
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  
  
  
</style>