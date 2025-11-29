// 放大镜   
(function(){
    var small =  document.querySelector('.smallimg');
    var large = document.querySelector('.largeimg');
    var largeItem = document.querySelector('.largeimg img');
    var mask = document.querySelector('.mask-box');
    var zoombox = document.querySelector('.zoombox');

    // 设置小图的鼠标进入监听事件
    small.onmouseenter = function(event){
        // 进入小图 mask和large出现
        mask.style.display = 'block';
        large.style.display = 'block';
    }
    small.onmousemove = function(event){
        // mask随着鼠标的移动改变位置   
        // 获取small在视口的位置，鼠标在视口的位置   获取鼠标在small上的位置
        var left =event.clientX - small.getBoundingClientRect().left ;
        var top =event.clientY - small.getBoundingClientRect().top  ;
        // 得到mask左上角在small上的位置
        left -= mask.offsetWidth/2;
        top -= mask.offsetHeight/2;
        
        //设置mask的范围 
        if(left<0){
            left = 0;
        }else if (left>small.offsetWidth-mask.offsetWidth) {
            left = small.offsetWidth-mask.offsetWidth;
        }

        if(top<0){
            top = 0;
        }else if( top>small.offsetHeight -mask.offsetHeight){
            top = small.offsetHeight -mask.offsetHeight;
        }
        // 设置x方向移动范围
        mask.style.left = left  + 'px';
        mask.style.top = top + 'px';

        // // 设置大图的位置
        // largeItem.style.left = -left*2 +'px';
        // largeItem.style.top = -top*2 +'px';

        // 设置内容在large元素中滚动的距离
        large.scrollLeft = left*2 ;
        large.scrollTop = top*2 ;
    }
    // 设置小图的鼠标离开监听事件
    small.onmouseleave = function(){
        // 离开小图 mask和large隐藏
        mask.style.display = 'none';
        large.style.display = 'none';
    }
    
})();
// 缩略图
(function(){
    // 获取元素
    var small =  document.querySelector('.smallimg img');
    var large = document.querySelector('.largeimg img');
    var thumbBox = document.querySelector('#thumbBox');
    var prevBtn = document.querySelector('#thumbBox .prevbtn');
    var nextBtn = document.querySelector('#thumbBox .nextbtn');
    var thumbWrapper = document.querySelector('#thumbBox .thumb-wrapper');

    // 遍历 添加元素
    goodData.imgsrc.forEach(function(imgitem,index){
        var imgBox = new Image();
        imgBox.dataset.index = index;
        imgBox.src = imgitem.s;
        thumbWrapper.appendChild(imgBox);
    });
    // 添加点击监听事件
    // 计算单个图片的总宽度
    var imgItemWidth = thumbWrapper.firstElementChild.offsetWidth + parseInt(getStyle(thumbWrapper.firstElementChild,'marginRight')) ;

    prevBtn.time = 0;
    // 点击上一个的箭头按钮
    prevBtn.onclick = function(event){
        if(event.timeStamp - prevBtn.time <400){
            console.log('ok');
            return;
        }
        prevBtn.time = event.timeStamp;
        // 根据thumbWrapper在包裹元素的起始位置
        var left = thumbWrapper.offsetLeft + imgItemWidth*2;
        // 设置移动范围
        if(left > 0){
            left = 0;
        } 
        thumbWrapper.style.left = left +'px';
    }
    // 点击下一个的箭头按钮
    nextBtn.time = 0;
    nextBtn.onclick = function(event){
        if(event.timeStamp - nextBtn.time <400){
            console.log('ok')
            return;
        }
        nextBtn.time = event.timeStamp;
        var left = thumbWrapper.offsetLeft - imgItemWidth*2;
        // 设置范围
        if(left < imgItemWidth*5 - thumbWrapper.offsetWidth ){
            left = imgItemWidth*5 - thumbWrapper.offsetWidth ;
        }
        thumbWrapper.style.left = left +'px';
    }
    // 事件委托
    // 自定义属性 谁都可以用
    thumbWrapper.onclick = function(event){
        if(event.target.tagName === 'IMG'){
            // 切换大图
            large.src = goodData.imgsrc[event.target.dataset.index].b;
            // 切换小图
            small.src = goodData.imgsrc[event.target.dataset.index].s;
        }   
       
    }
})();
// 侧边栏选项卡
(function(){
    // 获取元素
    var tabnavitems = document.querySelectorAll('#sidebarTab .tab-nav-item');
    var tabpanelitems = document.querySelectorAll('#sidebarTab .tab-panel-item');

    // 添加单击监听事件
    tabnavitems.forEach(function(item,index){
        item.onclick = function(){
            // 排他
            tabnavitems.forEach(function(item,index){
                item.classList.remove('active');
                tabpanelitems[index].classList.remove('active');
            })
            item.classList.add('active');
            tabpanelitems[index].classList.add('active');
        }
    })
})()