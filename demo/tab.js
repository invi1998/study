// 使用bind()
// var that;
class Tab {
    constructor(id) {
        //获取元素
        // that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        //选项卡的父元素
        this.fsetion = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.getNode();
        //init初始化操作让相关元素绑定事件
        this.add.onclick = this.addTab.bind(this.add,this);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);//这里通过bind()来改变,当我们点击了这个toggleTab后，一定不要修改这里的this指向，因为在toggleTab这个切换选项卡的函数是需要这个this的，即this.lis[i]，即指向当前的这个小li，但是我们使用了constructor里面的this来当做参数传递给这个toggleTab函数的形参that作为实参，所以在调用函数的时候形参that存放的就是constructor的this。然后就可以使用constructor里面的this在函数toggleTab面调用that.clearStyle();这个方法，依次类推，其他bind（）函数也是一样的方法。
            this.removeButton[i].onclick = this.removeTab.bind(this.removeButton[i],this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //获取所有的li和section
    getNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.removeButton = this.main.querySelectorAll('.wei');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    //切换功能
    toggleTab(that) {//注意这里的that不是全局变量的that，而是constructor通过bind()传递来的形参this，指向的是constructor
        that.clearStyle(); //使用constructor调用
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'; //使用constructor调用
    }
    //添加功能
    addTab(that) {
        that.clearStyle();
        //老方法
        //创建新的选项卡
        //将创建的选项卡添加到对应的父元素里
        //新方法
        //利用insertAdjacentHTML（）可以直接把字符串格式的元素添加到父元素里
        var rooud = Math.random();
        var li = '<li class="liactive"><span>新建选项卡</span><span class="wei">✘</span>';
        var sect = '<section class="conactive">新建内容' + rooud + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsetion.insertAdjacentHTML('beforeend', sect);
        that.init();
    }
    //删除功能
    removeTab(that,e) {
        e.stopPropagation(); //阻止关闭按钮的父级li的冒泡事件，（li的点击切换事件）
        var index = this.parentNode.index;
        that.lis[index].remove(); //remove()方法可以直接删除指定元素
        that.sections[index].remove();
        that.init(); //删除元素之后再更新一次元素
        //当我们删除一个未选中状态元素后，直接删除就可以
        if (document.querySelector('.liactive')) {
            return;
        }
        //当我们删除一个选中状态元素后，让他的前一个元素处于选中状态
        index--;
        that.lis[index] && that.lis[index].click();
    }
    //修改功能,双击可以修改文字
    editTab() {
        var star = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = star;
        input.select(); //让文本框里的文字处于选中状态
        //当我们离开文本框，就把文本框的值给span。
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        //按下回车也可以将文本框的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
    //清除所有li和section类样式
    clearStyle() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
}
new Tab('#tab');