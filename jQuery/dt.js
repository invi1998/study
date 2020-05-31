$(function(){
    var tootop=$("#play-box").offset().top;
    togg();
    function togg(){
        if($(document).scrollTop()>=tootop){
            var scrotop=
            $(".cebianlan-box-l").fadeIn();
            // $(".cebianlan-box-l").css("top",300+$(document).scrollTop()+"px");
        }else{
            $(".cebianlan-box-l").fadeOut();
            // $(".cebianlan-box-l").css("top",300+$(document).scrollTop()+"px");
        }
    }
    $(window).scroll(function(){
        togg();
    });
    $(".cebianlan-box-l div").click(function(){
        var curr=$(".main-box").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop:curr
        })
    })
})