window.onload = function(){
    var regphone=/^1[3|4|5|7|8]\d{9}$/;//手机号正则表达式
    var regqq=/^[1-9]\d{4,}$/;//腾讯QQ号从1000开始
    var regnic=/^[\u4e00-\u9af5]{3,8}$/;//输入3-8位中文符
    var regmes=/^\d{6}$/;
    var regpsd=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
    var tel=document.querySelector('#tel');//手机号
    var qq=document.querySelector('#qq');//qq号
    var nic=document.querySelector('#nic');//昵称
    var mes=document.querySelector('#mes');//短信验证码
    var psd=document.querySelector('#psd');//密码
    var repsd=document.querySelector('#repsd');//确认密码
    regexp(tel,regphone,'手机号码格式不正确，请重新输入');
    regexp(qq,regqq,'qq号码格式不正确，请重新输入');
    regexp(nic,regnic,'请输入3-8位中文作为昵称');
    regexp(mes,regmes,'请输入6位短信验证码');
    regexp(psd,regpsd,'强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)');
    function regexp(ele,reg,str){
        ele.onblur=function(){
            if(reg.test(this.value)){
                this.nextElementSibling.className='after success';
                this.nextElementSibling.innerHTML='<i class="iconfont icon-Icon-zhengque-"></i>格式正确!';
            }else{
                this.nextElementSibling.className='after error';
                this.nextElementSibling.innerHTML='<i class="iconfont icon-Icon-cuowu-"></i>'+str;
            }
        }
    }
    repsd.onblur=function(){
        if(this.value==psd.value){
            this.nextElementSibling.className='after success';
                this.nextElementSibling.innerHTML='<i class="iconfont icon-Icon-zhengque-"></i>格式正确!';
        }else{
            this.nextElementSibling.className='after error';
                this.nextElementSibling.innerHTML='<i class="iconfont icon-Icon-cuowu-"></i>俩次密码输入不一致，请重新输入';
        }
    }
    
}