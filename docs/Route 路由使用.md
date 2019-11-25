vuerouter 官网: https://router.vuejs.org/zh/



Vue Router 是 [Vue.js](http://cn.vuejs.org)

 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为



通过Vue Router 实现学院，班级，学生等界面的跳转，参数传递



定义的路由,通过url 和 组件的对应，进入不同的路由会显示对应的组件

路由定义:

```javascript
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
```

上面的组件根据路由的不同，把router-view替换成对应的组件

```html
App.vue
<div id="app">
......

    <el-main >
      <router-view></router-view>
    </el-main>
.....
   
</div>
```

默认会打开`/`对应的路由

### 路由跳转

通过Vue 的 $router对象，跳转到其他路由,和传递参数

```javascript
   this.$router.push({
        name:"class",
        params:{
          classid:params.name,
          collegeid:"大数据与人工智能学院"

        }
      })

    },
```



默认使用hash模式  模拟完整的html,url会是下面的样子

http://localhost:8081/#/data