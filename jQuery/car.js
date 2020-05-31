$(function(){
    cosum();
    //全选，全不选功能模块
    //即将全选按钮的状态赋值给其他复选框
    $(".checkall").change(function(){
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        }else{
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //:checked选择器 查找被选中的表单元素
    $(".j-checkbox").change(function(){
        if($(".j-checkbox:checked").length===$(".j-checkbox").length){
            $(".checkall").prop("checked", true);
        }else{
            $(".checkall").prop("checked", false);
        }
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //购物车增减商品数量
    //先声明一个变量，点击+号就++，-就--，然后赋值给input
    $(".increment").click(function(){
        //得到当前兄弟文本框的值
        var n=$(this).siblings(".itxt").val();
        var p=$(this).parent().parent().siblings(".p-price").html().substr(1);
        n++;
        $(this).siblings(".itxt").val(n);
        $(this).parent().parent().siblings(".all-price").text("￥"+(p*n).toFixed(2));
        cosum();
        // var all_p=0;
        // for(var i=0;i<$(".all-price").length;i++){
        //     var ap=$(".all-price").get(i).innerHTML;
        //     ap=parseFloat(ap.substr(1));
        //     all_p+=ap;
        // }
        // console.log(all_p);
        // $(".price-sum em").text("￥"+ all_p);
    });
    $(".decrement").click(function(){
        //得到当前兄弟文本框的值
        var n=$(this).siblings(".itxt").val();
        var p=$(this).parent().parent().siblings(".p-price").html().substr(1);
        if(n==0){
            return;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        $(this).parent().parent().siblings(".all-price").text("￥"+(p*n).toFixed(2));
        cosum();
        // var all_p=0;
        // for(var i=0;i<$(".all-price").length;i++){
        //     var ap=$(".all-price").get(i).innerHTML;
        //     ap=parseFloat(ap.substr(1));
        //     all_p+=ap;
        // }
        // $(".price-sum em").text("￥"+ all_p);
    });
    $(".itxt").change(function(){
        var n=$(this).val();
        if(n<0){
            $(this).val("0");
            n=0;
        }
        var p=$(this).parent().parent().siblings(".p-price").html().substr(1);
        $(this).parent().parent().siblings(".all-price").text("￥"+(p*n).toFixed(2));
        cosum();
        // var all_p=0;
        // for(var i=0;i<$(".all-price").length;i++){
        //     var ap=$(".all-price").get(i).innerHTML;
        //     ap=parseFloat(ap.substr(1));
        //     all_p+=ap;
        // }
        // $(".price-sum em").text("￥"+ all_p);
    });
    //计算总计
    function cosum(){
        var coun=0;
        var all_p=0;
        $(".itxt").each(function(i,elem){
            coun+=parseInt($(elem).val());
        });
        $(".amount-sum em").text(coun);
        $(".all-price").each(function(i,elem){
            all_p+=parseFloat(($(elem).text()).substr(1));
        });
        $(".price-sum em").text("￥"+ all_p.toFixed(2));
    }
    //删除商品
    $(".opr a").click(function(){
        $(this).parents(".cart-item").remove();
        cosum();
    });
    //删除复选框选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        cosum();
    });
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        cosum();
    })
})