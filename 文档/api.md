返回格式,data里面是数据

Response 
{
    code //状态码


    data:{ //数据

    }
}

term 学期:
term1,term2


1.头部年度数据 和 班级数据
url: /years
method:get
参数:{}
返回:
```json
{
    //所有学年数据
    years:[
    '2018',
    '2019'],
    //所有班级
    classes:[{
          label:"17", value:"17", children:[
            {label:"大数据",value:"bigdata"},
            {label:"云计算",value:"clound"}
          ]
      },
      {
         label:"18",value:"18",children:[{label:"大数据",value:"bigdata"},
            {label:"云计算",value:"clound"}]
      }
      ]
}
```

2. 学院数据
url:/collageData
method:get
参数:{
    //学院id
    college:"big",
    //请求的年度
    year:"2019",
    请求的学期
    term:"term1"
}



3. 班级
url:/classData
method:get
参数:
参数:{
    //班级id
    classid:"xxx",
    //请求的年度
    year:"2019",
    请求的学期
    term:"term1"
}


4. 学生

url:/studentData
method:get
参数:
参数:{
    //学生id
    studentid:"xxx",
    //请求的年度
    year:"2019",
    请求的学期
    term:"term1"
}
