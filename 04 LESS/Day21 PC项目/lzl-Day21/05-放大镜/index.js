// 放大镜   
(function(){
    var small =  document.querySelector('.smallimg');
    var large = document.querySelector('.largeimg');
    var largeItem = document.querySelector('.largeimg img')
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
    
})()