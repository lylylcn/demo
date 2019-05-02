var arr=[
    ["真理惟一可靠的标准就是永远自相符合","欧文"],
    ["时间是一切财富中最宝贵的财富","德奥弗拉斯多"],
    ["世界上一成不变的东西，只有“任何事物都是在不断变化的”这条真理","斯里兰卡"],
    ["过放荡不羁的生活，容易得像顺水推舟，但是要结识良朋益友，却难如登天","巴尔扎克"],
    ["日丽参差影，风传轻重香","李世民"],
    ["宁教我负天下人，休叫天下人负我","曹操"],
    ["做人低三分，做事高三分。业精于勤，荒于嬉","韩愈"],
    ["人只有为自己同时代人的完善，为他们的幸福而工作，他才能达到自身的完善",""]
];
function addEvent(elem,type,handle){
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on'+type,function(){
            handle.call(elem);
        });
    }else{
        elem['on'+type]=handle;
    }
}
var btn=document.getElementsByTagName('button')[0];
addEvent(btn,'click',handle);
function handle(){
    var num=Math.floor(Math.random()*8);
    var text1=arr[num][0];
    var text2=arr[num][1];
    if(text2===""){
        text2="匿名";
    }
    var words=document.getElementById('words');
    var au=document.getElementById('au');
    words.innerText=text1;
    au.innerText=text2;

    var r=Math.floor(Math.random()*255);
    var g=Math.floor(Math.random()*255);
    var b=Math.floor(Math.random()*255);
    var body=document.getElementsByTagName('body')[0];
    var a=document.getElementsByTagName('a');
    body.style.backgroundColor="rgb("+r+","+g+","+b+")";
    this.style.backgroundColor="rgb("+r+","+g+","+b+")";
    body.style.color="rgb("+r+","+g+","+b+")";
    a[0].style.color="rgb("+r+","+g+","+b+")";
    a[1].style.color="rgb("+r+","+g+","+b+")";

    var saying=document.getElementsByClassName('saying')[0];
    var author=document.getElementsByClassName('author')[0];
    saying.style.opacity=0;
    author.style.opacity=0;
    var speed=0;
    var timer=setInterval(function(){
        saying.style.opacity=speed;
        author.style.opacity=speed;
        if(speed>=1){
            clearInterval(timer);
        }
        speed+=0.1;
    },50);
}