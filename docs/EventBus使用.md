---
typora-root-url: ./
---



数据的请求都在Logo.vue 组件内

```js
请求学院数据
requestCollege()
请求班级数据
requestClass(classid)
请求学生数据
requestStudent
```



Logo 组件 和 下面的路由组件(Class.vue,College.vue之间交换数据





![](Event-Bus事件传递.png)



Logo.vue 和 下面的子页面为同级的组件,通过 `注册-发送` 事件的方式传递数据

如,以学院界面为例:

0. College内监听数据加载完成事件`collegeDataLoad`

   

```javascript
College.vue
EventBus.$on("collegeDataLoad",data=>{
      console.log("学院界面请求到数据...")
      // 保存数据
      this.data=data
      // 设置饼图的初始化指标，其他跟他联动的图一开始也是平均分这个指标，点击就切换成其他的
      this.nowIndex='平均分'
      // 设置指标饼图
      this.setIndex()
      // 设置top的班级
      this.set_classtop()
      // 设置gpa散点图
      this.set_gpa_score()
      // 设置分数范围
      this.set_range()
      // 设置趋势
      this.set_trend()
      //隐藏所有图表的加载动画
      this.hideLoad()
      
    })
```



1.  在vue 的 生命周期函数`mounted`里发送事件`requestData`

```
College.vue
EventBus.$emit("requestData","学院")
```



2. `Logo.vue` 接受到`requestData`事件

   

   与上面的组件同级的组件`Logo.vue`,在`mounted`时也注册监听了事件`requestData`事件

   ```javascript
     EventBus.$on("requestData",(from)=>{
               console.log(`来自:${from}的请求重新加载数据事件`)
               // 先请求导航里的数据
               this.requestNav()
           })
   ```

   接受到`requestData`事件，会先调用`this.requestNav()`请求班级，年度等数据

3. 请求数据成功,发送数据到子页面

   

```javascript
Logo.vue
college 为 测试数据，测试数据结构与请求回来的一样，将请求成功和测试的合并，发送事件出去,请求不同的页面发送不同的事件，学院的为`collegeDataLoad`
post("/api/nav/collage", {
        college:this.collegename,
        year: store.state.year,
        term: store.state.term
      })
        .then(res => {
         ...
          Object.assign(college, res);
          EventBus.$emit("collegeDataLoad", college);
        })
        .catch(err => {
      ...
          // 请求失败也显示测试数据
          EventBus.$emit("collegeDataLoad", college);
        });
    },
```



4. 子页面接受到事件

   不同的子界面注册不同的，

   `College.vue `注册的为 `collegeDataLoad`,事件由`Logo.vue`发出

   ```javascript
   College.vue
   注册监听事件,得到的数据显示到界面上
   EventBus.$on("collegeDataLoad",data=>{
         console.log("学院界面请求到数据...")
         // 保存数据
         this.data=data
         // 设置饼图的初始化指标，其他跟他联动的图一开始也是平均分这个指标，点击就切换成其他的
         this.nowIndex='平均分'
         // 设置指标饼图
         this.setIndex()
         // 设置top的班级
         this.set_classtop()
         // 设置gpa散点图
         this.set_gpa_score()
         // 设置分数范围
         this.set_range()
         // 设置趋势
         this.set_trend()
         //隐藏所有图表的加载动画
         this.hideLoad()
         
       })
   ```

   

- https://www.w3cplus.com/vue/event-bus.html
- https://www.w3cplus.com/vue/managing-state-in-vue-js.html?utm_source=tuicool&utm_medium=referral