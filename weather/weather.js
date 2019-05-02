// 请求的url
var url = "http://v.juhe.cn/weather/index?format=2&cityname=%E5%8D%97%E9%98%B3&dtype=json&format=1&key=";
url += "4d49b33578e471f9e11910d813fd8598";
var today1, //当前天的天气
    today2, //当前天实时的天气
    future; //未来六天的天气
var guidearr = [
    ["湿度: ", "humidity"],
    ["穿衣指数: ", "dressing_index"],
    ["洗车指数: ", "wash_index"],
    ["旅游指数: ", "travel_index"],
    ["锻炼指数: ", "exercise_index"],
    ["紫外线指数: ", "uv_index"]
]; // guide展示文本以及相应的返回信息的属性名

// 封装元素的元素子节点
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
};

// 封装添加事件
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, function () {
            handle.call(elem);
        });
    } else {
        elem['on' + type] = handle;
    }
}

// 使用jsonp进行跨域请求
function jsonp() {
    var script = document.createElement("script"); //动态创建script标签
    script.src = url + "&callback=handleResponse"; // url + 回调函数
    document.body.appendChild(script);
    this.className += " fa-spin"; //为刷新按钮添加旋转，造成刷新的效果
    var i=this;
    //一旦script 触发下面两种事件表明请求得到响应
    script.onload = script.onreadystatechange = function () {
        i.className = "fa fa-refresh fa-lg position";  // 取消旋转 ，刷新成功
        addElement(); // 添加刷新成功后的效果
    };

}

//jsonp的回调函数
function handleResponse(data) {
    var result = data.result;
    today1 = result.today;
    today2 = result.sk;
    future = result.future;
    // console.log(today1);
    // console.log(today2);
    // console.log(future);
}

//添加天气图片以及文字
function common(elem, obj) {
    var img = document.createElement('img');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var p5 = document.createElement('p');
    var src;
    var text;
    var date = obj.date_y || obj.date; //日期
    if (date.length === 8) {
        var date1 = date[0] + date[1] + date[2] + date[3] + "年" + date[4] + date[5] + "月" + date[6] + date[7];
        date = date1;
    } else {
        text = document.createTextNode(today2.temp + "℃  (当前温度)");
    }
    p4.innerText = date;
    var week = obj.week; //周几
    p5.innerText = week;
    var tem = obj.temperature; //温度（非实时）
    p1.innerText = tem;
    var weather = obj.weather; //天气
    p2.innerText = weather;
    var wind = obj.wind; //风
    p3.innerText = wind;
    // 复合天气显示第一个天气的图片
    var reg = /转.+/g;
    weather = weather.replace(reg, "");

    // 根据天气的不同选择不同的天气
    if (weather === "晴") {
        src = "image/晴.png";
    } else if (weather === "多云") {
        src = "image/多云.png";
    } else if (weather === "阴") {
        src = "image/阴.png";
    } else if (weather === "雪" || weather === "大雪" || weather === "小雪" || weather === "中雪") {
        src = "image/雪.png";
    } else if (weather === "雨" || weather === "大雨" || weather === "小雨" || weather === "中雨") {
        src = "image/雨.png";
    }
    // 将元素添加到页面
    elem.appendChild(p4);
    elem.appendChild(p5);
    img.setAttribute('src', src);
    elem.appendChild(img);
    if (text) {
        elem.appendChild(text);
    }
    elem.appendChild(p1);
    elem.appendChild(p2);
    elem.appendChild(p3);
}

function addElement() {
    var sign = document.getElementsByClassName("sign1");//选出所有需要加载的元素
    sign[0].innerHTML = ""; //删除之前的元素
    common(sign[0], today1); //添加刷新后的信息

    var child = sign[2].myChildren(); // 找到当前元素的所有元素子节点 ul-> li
    var j = 0,  
        flag = 0;  
    // future对象有7对值，第一个是当天的，应该跳过 ,其余的依次加入li中
    for (var key in future) {
        if (!flag) {
            flag = 1;
            continue;
        }
        child[j].innerHTML = "";
        common(child[j], future[key]);
        j++;
    }

    var children = sign[1].myChildren(); // 找到当前元素的所有元素子节点 ul-> li
    // 将当天的guide中的文本添加到页面，today1,today2对象中存储有相应的值，可以直接用[]访问
    children[0].innerText = guidearr[0][0] + today2[guidearr[0][1]];
    for (var v = 1; v < children.length; v++) {
        children[v].innerText = guidearr[v][0] + today1[guidearr[v][1]];
    }

    for (var i = 0; i < sign.length; i++) {
        sign[i].className += " showstyle";
    }

    //设置展示淡入效果，制造刷新效果
    var timer = setTimeout(function () {
        for (var i = 0; i < sign.length; i++) {
            sign[i].className = "sign1";
        }
        clearTimeout(timer);
    }, 400);
}



var reflash = document.getElementsByTagName("i")[0];
addEvent(reflash, "click", jsonp);