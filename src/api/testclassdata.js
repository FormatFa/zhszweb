export const ClassData={

 //基本信息
    classjbCard:{
        "classname":'17云计算1班',
        "students":43
    },//班级姓名及人数
//排名
    classCard1:{
        "term1_score":15,//第一学期的综合素平均分
        "term1_paiming":9,//第一学期在全院的排名
    },
    classCard2:{
        "term2_score":1,//第二学期的综合素平均分
        "term2_paiming":6//第二学期在全院的排名
    },
    //各指标的雷达图
    suchindexscores:[
        {value:[13,8,9,10,17,10,0],name:'学院指标平均分'},
        {value:[10,5,19,16,5,11,0],name:'班级指标平均分'}//思想政治vs身心健康vs创新创业vs技术技能vs志愿服务vs人文艺术vs综合素质理论'
    ],
    //班级名单
    students:{student:["陈秋明","梁家辉","赵旺","梁建成","渣渣"]},//班级个人的名单

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
            {value:320,name:'0-10'},//value是分数区间占有多少个人
            {value:9,name:'11-20'},
            {value:8,name:'21-30'},
            {value:7,name:'31-40'},
            {value:4,name:'41-50'}
          ]
    }

}