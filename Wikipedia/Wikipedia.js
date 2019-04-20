var url = "https://en.wikipedia.org/wiki/";
var num = 0; //获得词条个数

// 点击展开搜索框
$(".mag").on("click", function () {
    $(".mag > .left").animate({ //放大镜小棒消失
        width: "0px",
    }, 300, function () { 
        $(".mag").hide(); //放大镜消失
        $("#searchdiv").show(); //搜索框出现
        $(".input").animate({  //搜索框宽度展开
            width: "194px"
        }, 300);
        $("input").animate({   
            width: "194px"
        }, 300, function () {  // 叉叉出现
            $(".cha > .left").animate({
                width: "20px"
            }, 200);
            $(".cha > .right").animate({
                width: "20px"
            }, 200);
        });
    });
});
//点击搜索框变成放大镜
$(".cha").on("click", chacilck);

function chacilck() {
    $(".ulstyle").remove(); //如果当前已经有搜索内容 ，将搜索内容移除
    $(".wrapper").css("top", "50%"); //wrapper居中
    $("#input").val("");  //如果搜索框内有内容，清除
    $(".search > p").show(); //如果当前已经有搜索内容，将隐藏的”Click icon to search“显示
    $(".cha > .left").animate({//左叉叉消失
        width: "0px"
    }, 200);
    $(".cha > .right").animate({ //右叉叉消失
        width: "0px"
    }, 200, function () { //搜索框缩小
        $(".input").animate({
            width: "30px"
        }, 300);
        $("input").animate({
            width: "30px"
        }, 300, function () {
            $("#searchdiv").hide(); //搜索框隐藏
            $(".mag").show();  //放大镜出现
            $(".mag > .left").animate({  //放大镜小棒出现
                width: "15px",
            }, 300);
        });
    });
}

// 点击回车键检索
$(window).on("keydown", function (event) { 
    if (event.keyCode === 13) {
        var value = $("#input").val(); // 获取搜索框关键字
        if (value === "") {  //如果为空则变回放大镜
            chacilck();
        } else {
            var script = document.createElement("script");
            script.src = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=" +
                encodeURIComponent(value) + "&callback=handleResponse&srsearch=" + encodeURIComponent(value) + "&srlimit=12&srprop=snippet";
            document.body.appendChild(script);
        }

    }
});

// 字符串转换成DOM对象
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE;
}

function handleResponse(response) {
    $(".ulstyle").remove(); //如果当前已经有搜索内容 ，将搜索内容移除
    $(".wrapper").css("top", "25%"); //wrapper上移
    $(".search > p").hide();  //”Click icon to search“消失
    var search = response.query.search; //返回对象中的关键信息
    var title,
        snippet,
        li,
        p,
        a;
    var num = search.length; //获得词条个数
    var ul = document.createElement('ul'); //创建ul便签用于展示搜索内容
    ul.className = "ulstyle"; //给ul加上样式
    var sign = document.getElementById('sign'); 
    document.body.insertBefore(ul, sign); //将ul添加到文档中
    //将此词条依次加入ul中
    for (var i = 0; i < num; i++) {
        title = search[i].title; // 标题
        snippet = search[i].snippet; //内容
        p = document.createElement('p'); //标题标签
        $(p).css({
            "font-size": "24px",
            "margin-bottom": "10px"
        });
        li = document.createElement('li'); //内容标签
        a = document.createElement('a');
        p.innerHTML = title;
        li.append(p);
        li.append(parseDom(snippet));
        a.setAttribute("href", url + title);
        a.setAttribute("target", "_blank");
        a.append(li);
        ul.append(a);
    }

}