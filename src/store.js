// 全局存储
export const store = {
    
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