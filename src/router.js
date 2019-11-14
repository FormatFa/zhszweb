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
      path:"/:collegeid",component:College,name:"college"
    },
    {
      path:"/:collegeid/:classid/:studentid",component:Student,name:"student"
    },
    {
      path:"/:collegeid/:classid",component:Class,name:"class"
    },
    {
      path:"/login",component:Login,name:"login"
    },
    {
      path:"/",component:Data,name:"data"
    },
    {
      path:"/register",component:Register,name:"register"
    }
  ]
  
  const router = new VueRouter({
    routes: routes
  })
  export default router