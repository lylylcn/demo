var last = document.getElementsByClassName('left')[0];
var next = document.getElementsByClassName('right')[0];
var lilist1 = document.getElementsByClassName('wrapper')[0].getElementsByTagName('li');
var lilist2 = document.getElementsByClassName('circle')[0].getElementsByTagName('li');
var ul = document.getElementsByTagName('ul')[0];
addEvent(next, 'click', Next);
addEvent(last, 'click', Last);
var currentnum = 0; //当前可视图片标号
var nownum=1;//实际图片标号
var imagenum = lilist1.length-2; //图片可视数量
var nowimagenum=lilist1.length;//实际图片数量
var lock = false;
function Next() {
    if (!lock) {
        lock = true;
        for (var i = 0; i < lilist2.length; i++) {
            lilist2[i].className = "";
        }
        currentnum = (currentnum + 1) % imagenum;
        nownum=(nownum+1)%nowimagenum;
        lilist2[currentnum].className = "changecolor";
        var left = parseInt(getStyle(ul, 'left'));
        var timer1 = setInterval(function () {
            if (left > (-nownum * 730)) {
                left = left - 73;
                ul.style.left = left + "px";
            } else {
                clearInterval(timer1);
                if(nownum==nowimagenum-1){
                    ul.style.left=-730+"px";
                    nownum=1;
                }
                lock = false;
            }
        }, 30); 
    }
}
function Last() {
    if(!lock){
        lock=true;
        for (var i = 0; i < lilist2.length; i++) {
            lilist2[i].className = "";
        }
        currentnum = (currentnum - 1 + imagenum) % imagenum;
        nownum=(nownum-1+nowimagenum)%nowimagenum;
        lilist2[currentnum].className = "changecolor";//console.log(nownum);
        var left;
        var timer1 = setInterval(function () {
            left = parseInt(getStyle(ul, 'left'));
            if (left < (-nownum * 730)) {
                ul.style.left = left + 73 + "px";
            } else {
                clearInterval(timer1);
                if(nownum==0){
                    ul.style.left=-5110+"px";
                    nownum=nowimagenum-2;
                }
                lock=false;
            }
        }, 30);
    }
}
var timer = setInterval(Next, 5000);
for (var i = 0; i < lilist1.length; i++) {
    (function (i) {
        addEvent(lilist1[i], 'mouseover', mouseOver);
        addEvent(lilist1[i], 'mouseleave', mouseLeave);
    }(i));
}

function mouseOver() {
    clearInterval(timer);
}

function mouseLeave() {
    timer = setInterval(Next, 5000);
}