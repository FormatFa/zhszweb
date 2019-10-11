<template>
<div>
  <!-- 第一行 -->
    <el-row >
    <!-- 卡片 -->
    <!-- 基本情况 -->
      <el-col :span="5"><el-card >
        <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
        <div  class="text item">
          {{'17云计算1班    38人'}}
        </div>
      </el-card></el-col>
   <!-- 各个指标测评分的均分 雷达图 -->
      <el-col :span="12">
        <v-chart class="chart" autoresize :options="tree1"></v-chart>
      </el-col>
    <!-- 班级名单的下拉框 -->
      <el-col :span="4"><el-dropdown style="margin-left: 120px;">
    
              <span class="el-dropdown-link">
          班级同学名单
          <i class="el0icon-arrow-down el-icon--right"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
         <el-dropdown-item :key="people" v-for="people in peoples">
            {{people}}
         </el-dropdown-item>
        </el-dropdown-menu>



        </el-dropdown>
        </el-col>
  </el-row>

  <!-- 第二行 -->
   <el-row type="flex" justify="end" align="center">
     <!-- 各种关于综合素质的评分 -->
     <el-col :span="5">
       <el-card>
         <div slot="header" class="clearfix">
           <span>综合素质均分及排名</span>
         </div>
           <div class="text item">
             {{'测试，到时候再连接数据'}}
           </div>
       </el-card>
     </el-col>
     <!-- 下拉框 -->
     <!-- 各指标或总分的top 柱状图 -->
     <el-col :span="10" ><el-select v-on:change="zhibiaochange" v-model="value"  clearable placeholder="请选择" style="margin-left: 150px;">
       <el-option
       v-for="item in options"
       :key="item.value"
       :label="item.label"
       :value="item.value"></el-option>
       </el-select>
       <!-- top5柱状图 -->
        <v-chart class="chart" autoresize :options="tree2"></v-chart>
       </el-col>
       <!-- 总分区间漏斗图 -->
      <el-col :span="9">
        <v-chart class="chart" autoresize :options="tree3"></v-chart>
      </el-col>
   </el-row>


   <!-- 第三行 -->
   <!-- 建议 -->
   <el-row>
    <el-collapse v-model="activeNames" @ change="handleChange">
     <el-collapse-item title="根据在院里的排名，而给你的建议" name="1">
       <div>这只是一个测试，重复这只是个测试</div>
       <div>艹，老子吧想干了</div>
     </el-collapse-item>
   </el-collapse>
   </el-row>

</div>
</template>


<script>
 
    
export default {
  name:'banji',
  methods:{
    zhibiaochange(value){
      console.log("改变指标")
      console.log(value)
    
    },
      handleChange(val){
      console.log(val);
    }
  },
  data:function() {
    return{
        peoples:["渣渣","渣渣辉"],
        tree1:{title:{text:'各指标雷达图'},
        tooltip:{},
        legend:{data:['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论']},
        radar:{name:{
          textStyle:{
            color:'#fff',backgroundColor:'#999',borderRadius:3,padding:[3,5]}},
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
              name:'思想政治vs身心健康vs创新创业vs技术技能vs志愿服务vs人文艺术vs综合素质理论',
            type:'radar',
            data:[
              {value:[13,8,9,10,17,10,0],name:'第一学期'
              }
              ]
              }]},
      options:[{value:'选项1',label:'思想政治Top5'},
               {value:'选项2',label:'身心健康Top5'},
               {value:'选项3',label:'创新创业Top5'},
               {value:'选项4',label:'技术技能Top5'},
               {value:'选项5',label:'志愿服务Top5'},
               {value:'选项6',label:'人文艺术Top5'},
               {value:'选项7',label:'综合素质理论Top5'},
               {value:'选项8',label:'总分Top5'}],
               value:'',//雷达图
     tree2:{
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
         data:['渣渣1','渣渣2','渣渣3','渣渣4','渣渣5'],
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
         data:[5,6,7,9,15]
       }]
     },//柱状图
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