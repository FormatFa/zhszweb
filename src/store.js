// 全局存储
export const store = {
    // 所有的学院   
    
    
    state:{
        // 用户登录状态
        login:{
            // 用户名
            username:""
        },
        //当前选择的年度
        year:"2019",
        //当前选择的学期
        term:"term1",
        // 当前的学院
        
        colleges:["大数据与人工智能学院","计算机工程技术学院","商学院","应用外语学院","旅游学院旅","文化与传媒","机器人学院","机械与汽车学院","建筑工程学院","艺术设计学院","财会与金融学院","体育健康学院","马克思主义学院","国际合作学院","创新创业学院      ","广州学院","继续教育学院"]
        ,
        //获取当前学期
        termName(){
            if(this.term=="term1")
            {
                return "第一学期"
            }
            else if(this.term=="term2")
            {
                return "第二学期"
            }
            else if(this.term=="year"){
                return "年度"
            }
        }

    },
    setUserName(username){
        this.state.login.username=username;
    },
    setStudent(stu){
        this.state.nowStudent=stu
    },
    setYear(year){
        this.state.year=year
    },
    setTerm(term){
        this.state.term=term
    }

}