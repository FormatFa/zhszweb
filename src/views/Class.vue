<template>
<div>
  <!-- 第一行 -->
    <el-row :gutter="40">
    <!-- 卡片 -->
    <!-- 基本情况 -->
      <el-col :span="4" :xs="24"><el-card >
        <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div>{{data.classjbCard.classname}}</div>
          <div>人数:{{data.classjbCard.students}}</div>
      </el-card>
      <!-- 根据在院里排名的建议卡片 -->
      <el-card>
        <el-collapse v-model="activeNames" @ change="handleChange">
     <el-collapse-item title="根据在院里的排名，而给你的建议" name="1">
       <div>{{proposal}}</div>
       <div>{{proposal2}}</div>
      
     </el-collapse-item>
   </el-collapse>
      </el-card>
      </el-col>
   <!-- 各个指标测评分的均分 雷达图 -->
   
      <el-col :span="11"  :xs="24">
        <el-card>
        <v-chart class="chart" ref="suchindexscore"  autoresize></v-chart>
        <!-- 用ref定义一个变量名字，在下面调用 -->
        </el-card>
      </el-col>
   
    <!-- 班级名单的表格框 -->
    
      <el-col :span="9" :xs="24" >
        <el-card >
        <el-table  @row-click="intoStudent" :data="peoples" height="400" style="width: 100%">
          <!-- 用 @row-click监听点击班级名单所发生的跳转事件,定义peoples变量名用于循环列出班级名单 -->
          
          <el-table-column prop="name" label="班级同学名单"></el-table-column>
          
        </el-table>
        </el-card>
        </el-col>
    
  </el-row>

  <!-- 第二行 -->
   <el-row :gutter="40"  style="margin-top: 25px;" >
     <!-- 各种关于综合素质的评分 -->
     <el-col :span="4" :xs="20">
       <el-card>
         <div slot="header" class="clearfix">
           <span>第一学期综合素质均分及排名</span>
         </div>
           <div>第一学期综合素质平均分:{{data.classCard1.term1_score}}</div>
        <div>第一学期在全院排名:{{data.classCard1.term1_paiming}}</div>
       </el-card>
       <el-card>
         <div slot="header" class="clearfix">
           <span>第二学期综合素质均分及排名</span>
         </div>
        <div>第二学期综合素质平均分:{{data.classCard2.term2_score}}</div>
        <div>第二学期在全院排名:{{data.classCard2.term2_paiming}}</div>
       </el-card>
     </el-col>
     <!-- 下拉框 -->
     <!-- 各指标或总分的top 柱状图 -->
     
     <el-col :span="11" :xs="24" >
         <el-card>
       <el-select v-on:change="zhibiaochange" v-model="nowIndex"  clearable placeholder="请选择" style="margin-left: 300px;" size="small"> 
<!-- v-on:change用于改变下拉框指标 v-model用于在更改指标同时改变柱状图的数据 -->
       <el-option
       v-for="item in options"
       :key="item.value"
       :label="item.label"
       :value="item.value"></el-option>
       </el-select>
       
       <!-- top5柱状图 -->
        <v-chart class="chart" ref="topstudent" autoresize ></v-chart>
        <!-- 用ref定义一个变量名字，在下面调用 -->
  </el-card>
       </el-col>
   
       <!-- 总分区间漏斗图 -->
      <el-col :span="9" :xs="24">
        <el-card body-style="padding:36px" >
        <v-chart class="chart" ref="totalscores"   autoresize >
          <!-- 用ref定义一个变量名字，在下面调用 -->
        </v-chart>
        </el-card>
      </el-col>
     
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
     let indexs=['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论']//用于建议卡片调用
      console.log("Class mounted")  
        EventBus.$on("classDataLoad",data=>{
          //关闭图表加载
          this.hideLoad()
      console.log("班级界面请求到数据...")
      console.log(data)
      this.data=data
      //调用定义的变量
      this.set_topstudent()
      this.set_suchindexscore()
      this.set_studentnames()
      this.set_topstudent()
      this.set_totalscores()
      //通过判断各指标的循环对比得出最低的指标分数给出建议
      let minIndex=0
      let temp=this.data.suchindexscores[1].value;
      console.log("判断索引...")
      console.log(temp)
      for(let i=0;i<temp.length-2;i+=1)
      {
          if(temp[i]<temp[minIndex])minIndex=i
      }

      this.proposal2="班级"+indexs[minIndex]+"指标较低,有待加强"

      let score=0
    
      if(store.state.term==="term1")
      score=this.data.classCard1.term1_score;
      else
      score=this.data.classCard2.term2_score;
      console.log(store.state.term+"score:"+score)
      console.log(this.data.classCard1.term1_score)
      if (score>=0&&score<=15){
        this.proposal="分数较低需要加强"
      }
      else if (score>15&&score<=30){
        this.proposal="分数一般继续努力"
      }
      else if (score>30&&score<=50){
        this.proposal="分数不错，期待你们班的更好表现"
      }

    })
    this.showLoad()
    //请求班级数据
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
    //请求学生界面的路由，进入学生个人界面
    intoStudent(row, column, event){
   
      console.log("进入学生:"+row+" "+column+" "+event)
      console.log(this.$route);
         this.$router.push({
        name:"student",
        params:{
          studentid:row.name,
          classid:this.$route.params['classid']
        }
      })
    },
    //用于柱状图改变指标
    zhibiaochange(value){
      console.log("改变指标")
      console.log(value)
      this.set_topstudent()
      

    },
      handleChange(val){
      
    },
    //设置按学期各指标的雷达图
    set_suchindexscore()
    {
    console.log("显示雷达图，当前学期")
    //循环对比的出指标的最大值，用于定义雷达的最大临界点
    let suchindexscores=this.data['suchindexscores']
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
      
          title:{text:`${this.stateStore.termName()} 各指标雷达图`},
        tooltip:{},
        legend:{data:['学院指标平均分','班级指标平均分'],right:0},
        radar:{name:{
          textStyle:{
            color:'#000',backgroundColor:'#999',borderRadius:3,padding:[3,5]}},
            indicator:[{name:'思想政治',max:maxvalue},
            {name:'身心健康',max:maxvalue},
            {name:'创新创业',max:maxvalue},
            {name:'技术技能',max:maxvalue},
            {name:'志愿服务',max:maxvalue},
            {name:'人文艺术',max:maxvalue},
            {name:'综合素质理论',max:maxvalue}
            ]
            },
             
            series:[{
              name:'学院指标平均分vs班级指标平均分',
            type:'radar',
            data:
suchindexscores
             
              
              }]



    }
   
    this.$refs['suchindexscore'].mergeOptions(option)//调用数据写入雷达图
    

    }, 
    //班级名单
    //使用for循环，循环写入班级名单
    set_studentnames(){
      let student=this.data['students']['student']
      this.peoples.splice(0,this.peoples.length); 
      for(let i =0;i<student.length;i+=1)
      this.peoples.push(
        {
        name:student[i]
        }
        )
      
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
         name:'分数',
         type:'bar',
         barWidth:'60',
         data:scores
       }]
     }

     this.$refs['topstudent'].mergeOptions(option)//调用数据写入柱状图
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
  
      this.$refs['totalscores'].mergeOptions(option,false)//调用数据写入漏斗图
    }
  },

  data:function(){
    return{
        proposal:[],
        proposal2:"",
        stateStore:store.state,
        nowIndex:"总分Top5",
        data:ClassData,
        peoples:["渣渣","渣渣辉"],//班级名单
       
      //柱状图改变指标的下拉框
      options:[{value:'思想政治',label:'思想政治Top5'},
               {value:'身心健康',label:'身心健康Top5'},
               {value:'创新创业',label:'创新创业Top5'},
               {value:'技术技能',label:'技术技能Top5'},
               {value:'志愿服务',label:'志愿服务Top5'},
               {value:'人文艺术',label:'人文艺术Top5'},
               {value:'综合素质理论',label:'综合素质理论Top5'},
               {value:'总分',label:'总分Top5'}],
               value:'',
   
    activeNames:[1]//建议卡片的监听
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