import Vue from 'vue'
export const EventBus = new Vue()

/*
开始请求数据事件
startRequest
请求数据完成
1. 学院数据刷新事件

collegeDataLoad(data)
{

}
2. 班级加载
classDataLoad


3. 学生加载



进入学院或者班级界面后，发送请求数据参数给Logo组件
事件名:
requestData

*/