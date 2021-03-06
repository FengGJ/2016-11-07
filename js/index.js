$(function() {
    // 导航
    var width = $(window).width();
    var height = $(window).height();
    $(window).resize(function () {
        height = $(window).height();
        width=$(window).width();
        if (width > 767) {
            $(".nav .lists").removeAttr("style");
            $(document.body).removeClass("html-body-overflow");
            $(".banner .images li").css("width", "100%");
            $(".banner .images li figure").css("width", "100%");
            $(".footer .directory dl>dd").removeAttr("style")
        }else{
            scrollTop()
        }
    })
    function scrollTop() {
        if ($(".nav").attr("class") == "nav active") {
            $(".nav .lists").slideDown(500);

            $("body").css({height: height, "overflow-y": "hidden"})
            $("html").css("overflow-y", "scroll")
        } else {
            $(".nav .lists").slideUp(500);

            $("body").css({height: "100%"})
            $("html").css("overflow-y", "scroll")
            // $("body").css("height","100%")
        }
    }

    $(".nav .menu").click(function () {
        $(".nav").toggleClass("active")
        scrollTop()
        // $(document.body).toggleClass("html-body-overflow");
    })

    // banner

    var num = 0;
    var next = 0
    $(".banner .images ul>li").css("z-index", "0").eq(0).css("z-index", "1");
    var flag = false;
    // 轮播
    function move(type,s) {
        if (flag) {
            return;
        }
        flag = true;
        type = type || "next";
        if (type == "pre") {
            num--;
            if (num < 0) {
                num = $(".banner .images li").length - 1;
            }
            $(".banner .images ul>li").eq(num).css({left: 0, "z-index": 1});
            $(".banner .images ul>li").eq(next).css({"z-index": 2}).animate({left: width}, 1000, "easeInExpo", function () {
                $(".banner .images ul>li").eq(num).css({"z-index": 2});
                $(".banner .images ul>li").eq(next).css({"z-index": 1});
                flag = false;
                currentTime = 0;
            })

        } else if (type == "next") {
            num++;

            if (num >= $(".banner .images li").length) {
                num = 0;
                // $(".banner .dot_nav li").removeClass("active");
                $(".banner .dot_nav li p").css("width", "0");
            }
            $(".banner .images ul>li").eq(num).css({left: 0, "z-index": 1});
            $(".banner .images ul>li").eq(next).css({"z-index": 2}).animate({left: "-" + width}, 1000, "easeInExpo", function () {
                $(".banner .images ul>li").eq(num).css({"z-index": 2});
                $(".banner .images ul>li").eq(next).css({"z-index": 1});
                flag = false;
                if(w==0){
                    currentTime=0;
                }
            })
        }
        if(s){
            $(".banner .dot_nav li p").removeAttr("style")
             $(".banner .dot_nav li ").removeClass("active").eq(num).addClass("active");
        }

        next = num;
        currentTime = 0
    }

    var currentTime = 0;
    var t = setInterval(move, 3000);
    // 进度条
    var w = currentTime / 3000;
    function move1() {
        currentTime += 50;
        w = currentTime / 3000;
        if(w>1){
            w=1;
        }
        $(".banner .dot_nav li").eq(num).find("p").css("width", w * 100 + "%");
        if(w==1){
            w=0;
        }
    }
    var td=setInterval(move1,50);

    $(window).blur(function(){
        w=0;
        currentTime=0;
        $(".banner .dot_nav li").eq(num).find("p").css("width",0);
        clearInterval(t);
        clearInterval(td);
        return false;
    });
    $(window).focus(function () {
        if(t!=10){
            t = setInterval(move, 3000);
            td=setInterval(move1,50);
            return false;
        }

    })

    $(".banner .pre>button").click(function () {
        clearInterval(t);
        clearInterval(td);
        t=10;
        move("pre",1)
    })
    $(".banner .next>button").click(function () {
        clearInterval(t);
        clearInterval(td);
        t=10;

        move("next",1)
    })

    $(".banner .dot_nav li").on("click",function () {
        clearInterval(t);
        clearInterval(td);
        t=10;

        num=$(this).index();
        if(num>next){
            num=$(this).index()-1;
            move("next",1)
        }else if(num<next){
            num=$(this).index()+1;
            move("pre",1)
        }else if(num==next){
            $(".banner .dot_nav li p").removeAttr("style")
            $(".banner .dot_nav li ").removeClass("active").eq(num).addClass("active");
        }
    })




// 底部
    $(".footer .directory dl>dt").click(function(){
        if (width > 767) {

        }else{
            $(this).toggleClass("active");
            if($(this).attr("class")=="active"||$(this).attr("class")=="dt_padding active"){
                $(this).next().slideDown(300);
            }else{
                $(this).next().slideUp(300);

            }
        }


    })
})