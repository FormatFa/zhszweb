import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'

import College from './views/College.vue'
import Class from './views/Class.vue'
import Student from './views/Student.vue'

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
    path:"/class",component:Class
  }
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
