// 函数库

/**
 * 获取元素的计算属性
 * @param Elment ele 元素
 * @param String attr css属性名
 * @param String 计算属性值
 */
function getStyle(ele,attr){
    if (window.getComputedStyle) {
       return  getComputedStyle(ele)[attr];
    } else {
       return ele.currentStyle[attr];
    }  
}
/**
 * 选项卡函数
 * @params nodeList 选项卡导航按钮的集合
 * @params nodeList 选项卡内容项目的集合
 */
function tab(tabnavitems,tabpanelitems){
    tabnavitems.forEach(function(item,index){
        item.onclick =function(){
            // 排他操作
            tabnavitems.forEach(function(item,index){
                item.classList.remove('active');
                tabpanelitems[index].classList.remove('active');
            })
            item.classList.add('active');
            tabpanelitems[index].classList.add('active');
        }
    })
}