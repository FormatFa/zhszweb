import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router.js'


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
import 'echarts/lib/theme/dark'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.component('v-chart',ECharts)
Vue.config.productionTip = false

Vue.use(ElementUI)




new Vue({
  render: h => h(App),
  router
}).$mount('#app')
