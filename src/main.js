import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'

import College from './views/College.vue'
import Class from './views/Class.vue'
import Student from './views/Student.vue'
import Login from './views/Login.vue'
//引入echarts
import ECharts from 'vue-echarts'
//每个用到的图或者组件在这里引入
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'//饼图
import 'echarts/lib/chart/line'//折线图
import 'echarts/lib/chart/radar'//雷达图
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/scatter'//散点图
import 'echarts/lib/component/legend'//图例
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
Vue.component('v-chart',ECharts)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes =[
  {
    path:"/",component:College,name:"college"
  },
  {
    path:"/student",component:Student
  },
  {
    path:"/class/:classid",component:Class,name:"class"
  },
  {
    path:"/login",component:Login,name:"login"
  }
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
