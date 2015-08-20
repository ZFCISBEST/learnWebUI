/**
 * Created by fachao.zfc on 2015/8/11.
 */
$(document).ready(function(){
    //搜索区域
    $("#s_search").toggleStyle({backgroundColor:"#fff",boxShadow:"none"});

    //返回顶部
    $("#go_to_top").scrollToTop(350,50,function(){
        var speed = 50;
        $("body").animate({
            scrollTop:"0px"
        },speed);
    });

    //输入按钮的回车事件--搜索框
    $("#s_search").enterValue(function(value){
        alert(value);
    });

});

