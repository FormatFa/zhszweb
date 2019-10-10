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
      <el-col :span="4"><el-dropdown>
        <span class="el-dropdown-link">
          班级名单
          <i class="el0icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-ren slot="dropdowm">
          <ul id="example-1"><li el-dropdown-item="people in peoples">
            {{people}}
            </li></ul>
        </el-dropdown-ren>
        </el-dropdown></el-col>
  </el-row>

  <!-- 第二行 -->
   <el-row>
     <!-- 各种关于综合素质的评分 -->
     <el-col :span="5">
       <el-card>
         <div slot="header" class="clearfix">
           <span>综合素质均分及排名</span>
           <div class="text item">
             {{'测试，到时候再连接数据'}}
           </div>
       </el-card>
     </el-col>
     <!-- 下拉框 -->
     <!-- 各指标或总分的top 柱状图 -->
     <el-col :span="10"><el-select v-model="value" placeholder="请选择">
       <el-option
       v-for="item in options"
       :key="item.value"
       :label="item.label"
       :value="item.value">
       </el-select></el-col>
       <!-- 总分区间漏斗图 -->
      <el-col :span="9">
        <v-chart class="chart" autoresize :options="tree2"></v-chart>
      </el-col>
   </el-row>
   <!-- 第三行 -->
   <el-collapse v-model="activeNames" @ change="handleChange">
     <el-collapse-item title="根据在院里的排名，而给你的建议" name="1">
       <div>这只是一个测试，重复这只是个测试</div>
       <div>艹，老子吧想干了</div>
     </el-collapse-item>
   </el-collapse>
   <el-row>
     <!-- 建议 -->
      
   </el-row>

</div>
</template>


<script>
 example1=new Vue({el: '#example-1'})
    
export default {
  data:example1() {

  }
  
}
</script>

<style>

</style>