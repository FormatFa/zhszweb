---

typora-root-url: ./
---

## 学生综合素质可视化（前端）

## 前端技术栈

1. Vue CLI
快速搭建基于webpack的vue开发环境
https://cli.vuejs.org/zh/
2. Vue.js 
前端js框架，https://cn.vuejs.org/
3. VueRouter 
vue官方支持的路由管理，用来实现页面跳转，参数传递
https://router.vuejs.org/zh/
4. Element-UI
前端UI框架，基于Vue 2.0的桌面端组件库
https://element.eleme.cn/2.0/#/zh-CN/guide/design
5. vue-echarts
基于EChart封装的Vue组件,在Vue里使用起来很方便
https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
6. Axios 
基于Promise的HTTP库，用来发送ajax请求和后台交互,支持请求和响应拦截
http://www.axios-js.com/docs/
https://www.jb51.net/article/145341.htm
6. EventBus 
顶部导航组件和学院，班级等组件订阅事件和发布事件,
https://www.w3cplus.com/vue/managing-state-in-vue-js.html?utm_source=tuicool&utm_medium=referral




## 安装使用
- IDE (推荐VSCode)
- 安装Node.js环境
- npm 设置源为淘宝源(加快下载依赖速度)

### vscode 插件安装
- Vetur
.vue文件代码高亮
- REST Client(可选)
http api测试
- Debugger for Chrome(可选)
chrome里调试vue项目


### 修改配置
- 修改代理服务器
打开vue.config.js,修改proxy下面的target字段为后端服务器的地址


### 运行项目

在工程根目录运行下面的命令

- 安装依赖
```
npm install
运行调试
npm run serve
```
- 打包项目
```
npm run build
```


### 运行截图



![后台管理](/preview/admin.PNG)



![college](/preview/college.PNG)

![class](/preview/class.PNG)

![login](/preview/login.PNG)

![register](/preview/register.PNG)

## 工程结构

### 目录树
📦src
 ┣ 📂api                    api封装和每个页面测试数据
 ┃ ┣ 📜api.js
 ┃ ┣ 📜dataApi.js
 ┃ ┣ 📜http.js
 ┃ ┣ 📜navdata.js
 ┃ ┣ 📜testclassdata.js
 ┃ ┣ 📜testdata.js
 ┃ ┗ 📜teststudent.js
 ┣ 📂assets
 ┃ ┗ 📜logo.png
 ┣ 📂components             组件
 ┃ ┗ 📜Logo.vue            首页导航组件
 ┣ 📂images
 ┣ 📂utils                  
 ┃ ┗ 📜tools.js             工具类
 ┣ 📂views-------------------子视图
 ┃ ┣ 📜Class.vue------------班级界面路由
 ┃ ┣ 📜College.vue----------学院界面路由
 ┃ ┣ 📜Data.vue-------------数据管理界面
 ┃ ┣ 📜Login.vue------------登录界面
 ┃ ┣ 📜Register.vue---------注册界面
 ┃ ┗ 📜Student.vue----------学生个人界面
 ┣ 📜App.vue-----------------首页
 ┣ 📜event-bus.js------------event-bus封装
 ┣ 📜main.js-----------------入口
 ┣ 📜router.js---------------路由配置
 ┗ 📜store.js----------------全局存储



## 整体架构



