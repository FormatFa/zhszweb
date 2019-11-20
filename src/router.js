import Vue from 'vue'
import VueRouter from 'vue-router'
import College from './views/College.vue'
import Class from './views/Class.vue'
import Student from './views/Student.vue'
import Login from './views/Login.vue'
import Data from './views/Data.vue'
import Register from './views/Register'
Vue.use(VueRouter)
const routes =[
    {
      path:"/zhzs/:collegeid",component:College,name:"college"
    },
    {
      path:"/zhzs/:collegeid/:classid/:studentid",component:Student,name:"student"
    },
    {
      path:"/zhzs/:collegeid/:classid",component:Class,name:"class"
    },
    {
      path:"/login",component:Login,name:"login"
    },
    {
      path:"/",component:Data,name:"data"
    },
    {
      path:"/data",component:Data,name:"data"
    },
    {
      path:"/register",component:Register,name:"register"
    }
  ]
  
  const router = new VueRouter({
    routes: routes
  })
  export default router