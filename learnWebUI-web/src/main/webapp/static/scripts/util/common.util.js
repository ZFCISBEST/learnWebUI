/**
 * Created by fachao.zfc on 2015/8/11.
 */
;(function($){
    //这里开始写jquery插件，复用，提高利用率
    //切换样式
    $.fn.toggleStyle = function(options_in,options_out){
        var defaults_in = {
            border:"1px solid  rgba(253, 133, 0, 0.94)",
            boxShadow:"none"
        };

        var defaults_out = {
            border:"1px solid  #ccc",
            boxShadow:"none"
        };

        var opts_in = $.extend(defaults_in,options_in);
        var opts_out = $.extend(defaults_out,options_out);

        //设置、提取初始值
        var data = this.data();
        var $this = this;
        $.each(opts_in,function(key){
            if (undefined != opts_out[key]) {
                $this.data(key,opts_out[key]);
            }
            else {
                $this.data(key,$this.css(key));
            }

        });

        this.focusin(function(){
            $.each(opts_in,function(key){
                $this.css(key,opts_in[key]);
            });
        }).focusout(function(){
            $.each($this.data(),function(key){
                $this.css(key,$this.data()[key]);
            });
        });

        return this;
    };
    //切换样式End

    //滚动到顶端
    $.fn.scrollToTop = function(tops,speeds,functions){
        var $this = this;
        $(window).scroll(function(){
            var scroll_top = $("body").scrollTop();
            var speed = speeds;
            var top = tops;

            if (scroll_top >=top) {
                if ($this.hasClass("display_2")) return;
                $this.fadeIn(speed, function () {
                    $this.removeClass("display_1").addClass("display_2");
                });
            }
            else{
                if ($this.hasClass("display_1")) return;
                $this.fadeOut(speed, function () {
                    $this.removeClass("display_2").addClass("display_1");
                });
            }
        });

        $this.click(function(){
            functions();
        });
    };

    //滚动的异步加载
    $.fn.scrollAutoLoad = function(offV,callback){
        var defaults = {offV : 0.9};
        var opts = $.extend(defaults,offV);
        var $this = this;
        var flag = true;
        $(window).scroll(function(){
            var viewHei = $(window).height();
            var contentHei = $("body").get(0).scrollHeight;
            var scrollTop = $("body").scrollTop();
            //console.log(viewHei+"  "+ contentHei+" "+scrollTop);
            var offValue = (scrollTop + viewHei)/contentHei;
            if (offValue >= opts["offV"] && flag==true) {
                flag = false;
                callback($this,offValue);
                setTimeout(function(){flag = true},1000);
            }
        });
    };

    //滚动过程中，需要始终显示的功能
    $.fn.followScroll = function(top,scroll_dist){
        //var offset_top_default = 0;
        //var offsettop = $.extend(offset_top_default,offset_top);
        //console.log(offsettop);
        var $this = this;
        var offset_top = this.offset().top;
        $(window).scroll(function(){
            var scroll_top = $("body").scrollTop();
            if (scroll_top >=scroll_dist) {
                $this.css({top:(scroll_top-offset_top+top)+"px"});
            }
            else{
                $this.css({position:"relative",top:"0px"});
            }
        });
    };

    //回车事件监听
    $.fn.enterValue = function(callback){
        var $this = this;
        var value = "";
        $this.keydown(function(e){
            if (e.keyCode == 13) {//enter
                value = $this.val();
                callback(value);
            }
        });
    };

    //编号
    $.fn.newIndex = function(selector){
        this.find(selector).each(function(index){
            $(this).text(index+1);
        });
    }

})(jQuery);
