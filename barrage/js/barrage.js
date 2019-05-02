var text,
    position, //弹幕位置相对于浏览器的位置
    width, //弹幕窗口的宽
    height, //.......的高
    timer,
    timer2,
    dh = 20, //弹道高
    flag = 0; //标记timer计数器是否可以启动
var dmarr = []; //存储弹幕
var timerarr = []; //存放弹幕运动的计时器，便于clear或者到达屏幕尽头时清除计数器
main();

// send发送弹幕触发的事件
function send() {
    var input = $("input[type='text']");
    var main = $(".main");
    text = input.val();
    position = main.offset();
    width = main.width();
    height = main.height();
    input.val("");
    dmarr.push(text);
    // console.log(text + " " + width + " " + height);
    dmrun(text);
    if (!flag) {
        timer = setInterval(dmrun, 5000);
        flag = 1;
    }
}
// 为send按钮绑定事件
function addSendEvent() {
    $(".send").on("click", send);
    $(document).on("keydown", function (e) {
        var event = e || window.event;
        if (event.keyCode === 13) {
            send();
        }
    });
}

// 为clear按钮绑定事件
function addClearEvent() {
    $(".clear").on("click", function () {
        $(".main").html("");
        while (timerarr.length) {
            clearInterval(timerarr.pop());
        }
        dmarr.splice(0);
        flag = 0;
    });
}
// 给随机出来的弹幕加上样式并返回jq对象方便后面继续使用
function render(sp) {
    var h = Math.floor(Math.random() * 20) * dh;
    sp.addClass("danmu");
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = "rgb(" + r + "," + g + "," + b + ")";
    sp.css({
        'top': h,
        "color": color
    });
    return sp;
}

// 计时器
function dmrun() {
    var len = dmarr.length;
    if (len !== 0) {
        var sp = $("<span></span>");
        sp = render(sp);
        var num = Math.floor(Math.random() * len); //第几条弹幕
        //如果有传入参数表示是刚刚发送需要立即显示
        if (arguments.length == 0) {
            sp.text(dmarr[num]);
        } else {
            sp.text(arguments[0]);
        }
        var speed=1;
        $(".main").append(sp); //把弹幕加入屏幕
        //弹幕移动计时器
        timer2 = setInterval(function () {
            var left = parseInt(sp.css('left')); 
            left -= speed;
            speed++;
            sp.css("left", left);
            if (left <= -sp.width() - 5) {
                sp.remove();
                // clearInterval(timerarr.pop());
            }
        }, 500);
        timerarr.push(timer2);
    }
}

// 绑定事件
function main() {
    addSendEvent();
    addClearEvent();
}