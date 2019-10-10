<template>
  <div>
      <el-row >
        <el-col  :span="8">
          <img  style="width: 100%;height: 60px" src="/logo.jpg"/>
        </el-col>

      <el-row  type="flex" justify="end" :span="10" >
          <el-button>按钮</el-button>

          <!-- 年度选择 -->
          <el-select v-model="year">
            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <!-- 学期选择 -->
          <el-select v-model="term">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>

          <el-cascader
            :options="classes"
          ></el-cascader>
        </el-row>

      </el-row>
  </div>
</template>

<script>
export default {

  data(){
    return {

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

      year:"",
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


    term:"",
      terms:[
      {
        value:"term1",
        label:"第一学期"
        
      },
      {
        value:"term2",
        label:"第二学期"
      }
    ]


    }


  }


}
</script>

<style>

</style>