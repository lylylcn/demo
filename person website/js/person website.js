var times = 0;
var input = $(".inputstyle");
$.each(input, function (i) {
    var text = "";
    if (i === 0) text = "Name";
    else if (i === 1) text = "Email Address";
    else if (i === 2) text = "Phone Number";
    else if (i === 3) text = "Message";
    $(this).on("focus", function () {
        var text1 = this.value;
        // console.log(text1);
        if (text1 === text) {
            this.value = "";
            $(".choose").eq(i).addClass("chooseshow");
            $(".choose").eq(i).removeClass("choosedisappear");
        }
    });
    $(this).on("blur", function () {
        var text1 = this.value;
        // console.log(text1);
        if (i === 0) {
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
            } else {
                $(this).next().hide();
            }
        } else if (i === 1) {
            var reg = /^([\w\.\-])+(\@[\w\-]+\.)+([\w]{2,4})+$/g;
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
            } else if (!text1.match(reg)) {
                $(this).next().show();
            } else {
                $(this).next().hide();
            }
        } else if (i === 2) {
            var reg1 = /^[1]+([\d]{10})/g;
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
            } else if (!text1.match(reg1)) {
                $(this).next().show();
            } else {
                $(this).next().hide();
            }
        } else if (i === 3) {
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
            } else if (text1.length < 10) {
                $(this).next().show();
            } else {
                $(this).next().hide();
            }
        }
    });
});

function blur() {
    $.each(input, function (i) {
        var text1 = this.value;
        console.log(text1);
        if (i === 0) {
            if (text1 === "") {
                conlog.log("fjskf");
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
                $(".choose").eq(i).css("sign","0");
            } else {
                $(this).next().hide();
                $(".choose").eq(i).css("sign","1");
            }
        } else if (i === 1) {
            var reg = /^([\w\.\-])+(\@[\w\-]+\.)+([\w]{2,4})+$/g;
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
                $(".choose").eq(i).css("sign","0");
            } else if (!text1.match(reg)) {
                $(this).next().show();
                $(".choose").eq(i).css("sign","0");
            } else {
                $(this).next().hide();
                $(".choose").eq(i).css("sign","1");
            }
        } else if (i === 2) {
            var reg1 = /^[1]+([\d]{10})/g;
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
                $(".choose").eq(i).css("sign","0");
            } else if (!text1.match(reg1)) {
                $(this).next().show();
                $(".choose").eq(i).css("sign","0");
            } else {
                $(this).next().hide();
                $(".choose").eq(i).css("sign","1");
            }
        } else if (i === 3) {
            if (text1 === "") {
                $(this).next().show();
                this.value = text;
                $(".choose").eq(i).addClass("choosedisappear");
                $(".choose").eq(i).css("sign","0");
            } else if (text1.length < 10) {
                $(this).next().show();
                $(".choose").eq(i).css("sign","0");
            } else {
                $(this).next().hide();
                $(".choose").eq(i).css("sign","1");
            }
        }
    });
}
$(".btn").on("click", function () {
    console.log("hdsjkhfj");
    blur();
    $.each(input,function(i){
        if($(this).sign==="0"){
            return false;
        }
    });
    return true;
});

$(".navigator  a").on("click",function(e){
    e.preventDefault();
    $('.active').removeClass("active");
    $(this).addClass("active");
});
$('.fa-bars').on('click',function() {
    if(times%2 === 0){
        $('.head').css({height:'225px'});
        $('.navigator').css({display:'block'});
    }else {
        $('.head').css({height:'80px'});
        $('.navigator').css({display:'none'});
    }
    times ++;
});