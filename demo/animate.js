function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var step=(target-obj.offsetLeft)/10;
        step=step>0? Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft==target){
            //等于移动距离，停止定时器
            clearInterval(obj.timer);
            // if(callback)//判断是否添加回调函数，有就调用。
            // {
            //     callback();
            // }
            callback && callback();//和上面的写法不同，但是意思一样，效果一样
        }
        obj.style.left=obj.offsetLeft+step+'px';
    },10);
}
// var document.querySelector('div');
// animate(div,500,function(){
//     div.style.backgroundColor='red';
//});//调用动画函数即可