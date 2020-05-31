window.addEventListener('load',function(){
    //获取元素
    var arrowl=document.querySelector('.arrow-l');
    var arrowr=document.querySelector('.arrow-r');
    var focus=document.querySelector('.focus');
    //num控制图片的滚动，点击一次按钮，num做相应的++或者--
    var num=0;
     //circle控制小圆圈的播放，（类样式），点击一次按钮，circle做相应的++或者--
    var circlenum=0;
    //鼠标经过focus 显示左右按钮，同时暂停自动轮播定时器
    focus.addEventListener('mouseenter',function(){
        arrowl.style.display='block';
        arrowr.style.display='block';
        clearInterval(timer);
        timer=null;//清除定时器
    })
    //鼠标离开focus 掩藏左右按钮，同时启动自动轮播定时器
    focus.addEventListener('mouseleave',function(){
        arrowl.style.display='none';
        arrowr.style.display='none';
        timer=setInterval(function(){
            //手动调用事件
            arrowr.click();
        },2000);
    })
    //动态生成小圆圈 有几张图片就生成几个小圆圈
    var ol=focus.querySelector('.dian');
    var ul=focus.querySelector('ul');
    for(var i=0;i<ul.children.length;i++){
        //创建一个小li
        var li=document.createElement('li');
        //通过自定义属性设置小圆圈的索引号
        li.setAttribute('index',i);
        //把创建的小li插入到ol里
        ol.appendChild(li);
        //小圆圈的排他思想，在生成小圆圈的时候，为小圆圈绑定点击事件
        li.addEventListener('click',function(){
            //先将所有小圆圈样式设为none（去除样式类名 ）
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            //为当前的点击小圆圈对象添加类名
            this.className='curent';
            //点击了某个小圆圈，就获取当前小li的索引
            var indexx=this.getAttribute('index');
            //将这个索引赋值给num和criclenum，即大图的移动步数和小圆圈的移动步数
            num=indexx;
            circlenum=indexx;
            var target=this.getAttribute('index')*focus.offsetWidth;
            animate(ul,-target);
        })
    }
    //默认情况下吧ol里的第一个li设置为curent类名
    ol.children[0].className='curent';
    //克隆第一张图片，深度克隆，放到ol的最后，用于无缝滚动
    var fistimg=ul.children[0].cloneNode(true);
    //将克隆体放到ul的最后
    ul.appendChild(fistimg);
    //设置节流阀
    var flag=true;
    //右侧按钮点击事件
    arrowr.addEventListener('click',function(){
        if(flag){
            flag=false;//关闭节流阀
            //无缝滚动
            //如果走到了最后复制的图片，此时将ul的left改为0
            if(num==ul.children.length-1){
                ul.style.left=0;
                num=0;
            }
            num++;
            //调用动画函数，实现图片的播放
            animate(ul,-num*focus.offsetWidth,function(){
                flag=true;//打开节流阀
            });
            circlenum++;
            if(circlenum==ol.children.length){
                circlenum=0;
            }
            //下方小圆圈也在图片切换完成之后进行相应的改变
            criclechange();
        }
    })
    arrowl.addEventListener('click',function(){
       if(flag){
           flag=false;//关闭节流阀
            //无缝滚动
            if(num==0){
                ul.style.left=-(ul.children.length-1)*focus.offsetWidth+'px';
                num=ul.children.length-1;
            }
            num--;
            animate(ul,-num*focus.offsetWidth,function(){
                flag=true;//打开节流阀
            });
            circlenum--;
            if(circlenum<0){
                circlenum=ol.children.length-1;
            }
            criclechange();
       }
    })
    function criclechange(){
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circlenum].className='curent';
    }
    //设置一个定时器，自动播放轮播图
    var timer=setInterval(function(){
        //手动调用事件
        arrowr.click();
    },2000);
})