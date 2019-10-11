export const college={
    //基本信息
    basicCard:{
        "year_score":123,
        "term1_score":90,
        "term2_score":120
    },
    //指标和对应的平均分  xx年y学期
    indexes:{
    index:["名下房产","豪车数量","电脑配置"],
    scores:[100,200]
    },
    // top 总分学生和班级
    top:{
        "名下房产":{
            classes:[{
                name:"class1",
                score:12
            },{
                name:"class2",
                score:8
            }],
            students:[
                {
                    name:"小明",
                    score:300
                },
                {
                    name:"小绿",
                    score:250
                },
                {
                    name:"小红",
                    score:200
                }
    
            ]
        },
        "豪车数量":{
            classes:[{
                name:"class1",
                score:15
            },{
                name:"class2",
                score:12
            }],
            students:[
                {
                    name:"小明",
                    score:300
                },
                {
                    name:"小绿",
                    score:250
                },
                {
                    name:"小红",
                    score:200
                }
    
            ]
        },
           "电脑配置":{
            classes:[{
                name:"class1",
                score:19
            },{
                name:"class2",
                score:13
            }],
            students:[
                {
                    name:"小明",
                    score:300
                },
                {
                    name:"小绿",
                    score:250
                },
                {
                    name:"小红",
                    score:200
                }
    
            ]
        }
    
    },
    
    //分数区间数据
    "range":{
        //分数出现的范围的字符串
        "ranges":["(0-10]","(10-20]","(20-30]"],
        //对应的成绩
        "scores":[10,30,20]
    
    },
    // 根据年度字段 两个学期的 gpa 和成绩数据
    "gpa_score":{
        gpas:[4.1,4,2,4,3],
        scores:[20,30,40]
    },
    //学院 每年的总平均分变化趋势
    "trend":
    {
        //年度列表
        "years":["2018","2019","2020"],
        "scores":[100,200,300]
    }
    
    
    
    }