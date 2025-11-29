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
    tab(tabnavitems,tabpanelitems)
})();
// 商品详情选项卡
(function(){
    // 调用函数
   tab(document.querySelectorAll('#introTab .tab-nav-item'),document.querySelectorAll('#introTab .tab-panel-item'))
})();
// 商品参数选项 购买数量 搭配商品
(function(){

    // 获取元素
    var selectedBox = document.querySelector('#selectedBox');
    var optionsBox = document.querySelector('#optionsBox');
    var priceBox = document.querySelector('#priceBox');
    var numInput = document.querySelector('#numInput');
    var plusBtn = document.querySelector('#plusBtn');
    var minusBtn = document.querySelector('#minusBtn');
    
    // 创建dl元素 添加到optionBox
    goodData.goodsDetail.crumbData.forEach(function(dlitem,dlindex){
        var dl = document.createElement('dl');
        optionsBox.appendChild(dl);
        // 创建dt元素 添加到dl中
        var dt = document.createElement('dt');
        dt.innerHTML = dlitem.title;
        dl.appendChild(dt);
        // 创建dd元素
        dlitem.data.forEach(function(dditem,ddindex){
            var dd = document.createElement('dd');
            dd.innerHTML = dditem.type;
            dd.dataset.changePrice = dditem.changePrice;
            dl.appendChild(dd);
            // 设置自定义属性 记录dl索引
            dd.dataset.groupindex = dlindex;
            if(ddindex === 0){
                dd.classList.add('active')
            }
        });   
    });
    var selectedArr = Array(4);
    var productNum = 1;
    //事件委托 添加dd监听单击事件
    optionsBox.onclick = function(event){
        if(event.target.tagName === 'DD'){
            // 同组排他
            var siblingEles = event.target.parentElement.children;
            for(var i=1;i<siblingEles.length;i++){
                    siblingEles[i].classList.remove('active');
            }
            event.target.classList.add('active');
            //  创建选中标签元素 添加到selectedBox
            selectedArr[event.target.dataset.groupindex] = event.target;
            // 遍历数组
            createSelectedTag();
            priceChange();
        }
    } 
    // 设置dd的自定义属性，dd.dataset-index = dlindex，这样可以把dl的index给里面的dd，让同一dl下的订单dataset.index相同。设置数组长度，内容是event.target   
    // 之前选择的标签通过数组存下来了，所以清空selectedBox被清空，再次遍历数组，之前的数据还在
    
    // 委托事件 设置close监听单击事件
    selectedBox.onclick = function(event){
        // 判断是不是关闭按钮
        if(event.target.tagName === 'SPAN'){
            // 删除所在的选中标签
            var ddEle = selectedArr[event.target.parentElement.dataset.index];
            // 删除当前选中的dd的元素
            selectedBox.removeChild(event.target.parentElement);
            // 移出选中状态
            ddEle.classList.remove('active');
            delete selectedArr[event.target.parentElement.dataset.index];
            ddEle.parentElement.children[1].classList.add('active');
            priceChange();
        }
    };

    // 点击plus按钮
    plusBtn.onclick = function(){
        productNum++;
        numInput.value = productNum;
        priceChange();
    };
    // 点击minu按钮
    minusBtn.onclick = function(){
        productNum--;
        if(productNum<=0){
            productNum = 1;
        }
        numInput.value = productNum;
        priceChange();
    };
    // 监听输入框数量改变
    numInput.onchange = function(){
        // 获取输入数量
        productNum = numInput.value;
        if(isNaN(productNum) || productNum<=0){
            productNum = 1;
        }
        numInput.value = productNum;
        priceChange();
    }

    /**
     * 根据数组 selectedArr 创建 selectedTag 选中标签元素
    */
    function createSelectedTag() {
        // 清空选中标签的包裹元素
        selectedBox.innerHTML = '';

        // 遍历 selectedArr 数组
        selectedArr.forEach(function(ddEle, index){
            // 创建选中标签元素 添加到 selectedBox
            var selectedEle = document.createElement('div');
            selectedEle.className = 'selected-tag';
            selectedEle.innerHTML = ddEle.innerHTML + '<span class="close">&times;</span>';
            selectedEle.dataset.index = index;
            selectedBox.appendChild(selectedEle);
        });
    }
    /**
     * 计算商品的价格
     * */ 
    function priceChange(){
        // 获取初始价格
        var price = goodData.goodsDetail.price;
        // 根据selectedArr数组中 选中的标签 修改价格
        selectedArr.forEach(function(ddEle){
            price += (+ddEle.dataset.changePrice);
        })
        // 总价= 单价*数量
        masterPrice = price * productNum;
        priceBox.innerHTML = masterPrice;
    }
})();