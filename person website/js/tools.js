//圣杯模式继承
function inherit(Target,Origin){
    function F(){};
    F.prototype=Origin.prototype;
    Target.prototype=new F();
    Target.prototype.constuctor=Target;
    Target.prototype.uber=Origin.prototype;
}
//数组去重
Array.prototype.unique=function (){
    var obj={};
    var target=[];
    var flag=0;
    for(var key in this){
        if(!typeof(obj[this[key]])){
            target[flag++]=this[key];
            obj[this[key]]=1;
        }
    }
    return target;
}
//找出元素子节点
Element.prototype.myChildren=function(){
    var child=this.childNodes;
    var len=child.length;
    var arr=[];
    for(var i=0;i<len;i++){
        if(child[i].nodeType==1){
            arr.push(child[i]);
        }
    }
    return arr;
}
//返回元素的第n个元素节点，n为正返回后面的，n为负返回前面的
function retSibling(e, n) {
    while (n && e) {
        if (n > 0) {
            if (e.nextElementSibling){
                e = e.nextElementSibling;
            }
            else {
                e = e.nextSibling;//下一个兄弟节点
                while (e.nodeType!= 1&&e)
                    e = e.nextSibling;
            }
            n--;
        } else {
            if (e.previousElementSibling)
                e = e.previousElementSibling;
            else {
                e = e.previousSibling;//上一个兄弟节点
                while (e.nodeType != 1&&e) {
                    e = e.previousSibling;
                }
            }
            n++;
        }
    }
    return e;
}
//在指定元素后面插入元素节点
Element.prototype.insertAfter=function (insert,afte){
    var nextnode=afte.nextElementSibling;
    if(nextnode){
        this.insertBefore(insert,nextnode);
    }else{     
        this.appendChild(insert);
    }
}
//获取滚动条的滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft +
                document.documentElement.scrollLeft,
            y: document.body.scrollTop +
                document.documentElement.scrollTop
        }
    }
}
//获取窗口大小
function getViewportOffset(){
    if(window.innerWidth){console.log(11);
        return {
            w:window.innerWidth,
            h:window.innerHeight
        }
    }else{
        if(document.compatMode=="BackCompat"){
            console.log(1);
            return {
                w:document.body.clientWidth,
                h:document.body.clientHeight
            }
        }else{console.log(2);
            return {
                w:document.documentElement.clientWidth,
                h:document.documentElement.clientHeight
            }
        }
    }
}
//元素相对于文档的坐标
function getElementPosition(child){
    if(!child)return {};
    var parent=child.offsetParent;
    if(parent==document.body){
        return {
            x:child.offsetLeft,
            y:child.offsetTop
        }
    } 
    return {
        x:parseInt(child.offsetLeft)+parseInt(getElementPosition(child.offsetParent).x),
        y: parseInt(child.offsetTop)+parseInt(getElementPosition(child.offsetParent).y)
    }
}
//返回元素的style
function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}
//封装事件处理函数
function addEvent(elem,type,handle){
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on'+type,function(){
            handle.call(elem);
        })
    }else{
        elem['on'+type]=handle;
    }
}

//封装解除事件处理
function removeEvent(elem,type,handle){
    if(elem.removeEventListener){
        elem.removeEventListener(type,handle,false);
    }else if(elem.detachEvent){
        elem.detachEvent('on'+type,function(){
            handle.call(elem);
        })
    }else{
        elem['on'+type]=handle;
    }
}
//封装取消冒泡事件
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}
//封装取消默认事件
function cancelHandle(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
}
//封装异步加载
function loadScript(url,callback){
    var script = documnet.createElement('script');
    script.type = "text/javascript";
    
    if (script.readyState) {//ie
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                tools[callback]();
            }
        }
    } else {// Safari Opera chrome firefox
        script.onload = function () {
            tools[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}