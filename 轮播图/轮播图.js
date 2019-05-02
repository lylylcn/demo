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
function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}
var last=document.getElementsByClassName('left')[0];
var next=document.getElementsByClassName('right')[0];
var lilist1=document.getElementsByClassName('wrapper')[0].getElementsByTagName('li');
var lilist2=document.getElementsByClassName('circle')[0].getElementsByTagName('li');
addEvent(next,'click',Next);
addEvent(last,'click',Last);
var currentnum=0;//当前图片标号
var imagenum=lilist1.length;//图片数量
var switchTime=5000;//图片切换事件
function Next(){
    for(var i=0;i<lilist1.length;i++){
        lilist1[i].className="";
    }
    for(var i=0;i<lilist2.length;i++){
        lilist2[i].className="";
    }
    currentnum=(currentnum+1)%imagenum;
    lilist1[currentnum].className="show";
    lilist2[currentnum].className="changecolor";
    
}
function Last(){
    for(var i=0;i<lilist1.length;i++){
        lilist1[i].className="";
    }
    for(var i=0;i<lilist2.length;i++){
        lilist2[i].className="";
    }
    currentnum=(currentnum-1+imagenum)%imagenum;
    lilist2[currentnum].className="changecolor";
    lilist1[currentnum].className="show";
}
var timer=setInterval(Next,switchTime);
for(var i=0;i<lilist1.length;i++){
    (function(i){
        addEvent(lilist1[i],'mouseover',mouseOver);
        addEvent(lilist1[i],'mouseleave',mouseLeave);
    }(i));
}
function mouseOver(){
    clearInterval(timer);
}
function mouseLeave(){
    timer=setInterval(Next,switchTime);
}








