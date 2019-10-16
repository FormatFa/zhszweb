export const ClassData={

 //基本信息
    classjbCard:{
        "classname":'17云计算1班',
        "students":43
    },//班级姓名及人数
//排名
    classCard:{
        "term1_score":0,//第一学期的综合素平均分
        "term2_score":1,//第二学期的综合素平均分
        "term1_paiming":9,//第一学期在全院的排名
        "term2_paiming":6//第二学期在全院的排名
    },
    //各指标的雷达图
    suchindexscore:{
        suchnames:['思想政治','身心健康','创新创业','技术技能','志愿服务','人文艺术','综合素质理论'],
        suchscores:[13,8,9,10,17,10,0]//各指标的分数
    },
    //班级名单
    students:{student:["渣渣辉1","渣渣辉2"]},//班级个人的名单

    //各指标的top数据
    topstudent:{
        "身心健康":{
         names:['渣渣1','渣渣2','渣渣3','渣渣4','渣渣5'],//top的人名
         scores:[5,6,7,9,15]//top对应人名的分数
        },
        "创新创业":{
            names:['渣渣1','渣渣2','渣渣3','渣渣4','渣渣5'],
            scores:[15,6,17,9,15]   
           }
    },
    //总分区间漏斗图
    totalscores:{
        ranges:['0-10','11-20','21-30','31-40','41-50'],//分数区间
        allscores:[
            {value:20,name:'0-10'},//value是分数区间占有多少个人
            {value:9,name:'11-20'},
            {value:8,name:'21-30'},
            {value:7,name:'31-40'},
            {value:4,name:'41-50'}
          ]
    }

}