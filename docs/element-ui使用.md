### element npm安装以及引用
npm i element-ui -S
在main.js中引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
### element 所调用组件
Layout布局 通过基础的 24 分栏，迅速简便地创建布局，但是只能设置框架的长，不能设置高
Card卡片 将信息聚合在卡片容器中展示，将echart做的图放在卡片中，更好进行页面的布局
Cascader级联选择器 当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择，把班级分为年级班级进行选择
Select选择器 当选项过多时，使用下拉菜单展示并选择内容，可以选择学院年份，学期，以及各指标等的选择
Table表格 用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作，用于列出班级同学名单，进行选择进入个人界面