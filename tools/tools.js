//深度克隆
function deepClone(target, origin) {
    var target1 = (origin instanceof Array) ? [] : {}; 
    var target = target || target1; 
    var toStr = Object.prototype.toString,
        isArray = "[object Array]";
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'object') {
                if (toStr.call(origin[key]) === isArray) {
                    target[key] = [];
                } else {
                    target[key] = {};
                }
                deepClone(target[key], origin[key]);
            } else {
                target[key] = origin[key];
            }
        }
    }
    return target;
}
//圣杯模式继承
function inherit(Target, Origin) {
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constuctor = Target;
    Target.prototype.uber = Origin.prototype;
}
//数组去重
Array.prototype.unique = function () {
    var obj = {};
    var target = [];
    var flag = 0;
    for (var key in this) {
        if (!typeof (obj[this[key]])) {
            target[flag++] = this[key];
            obj[this[key]] = 1;
        }
    }
    return target;
}
//找出元素子节点
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
}
//返回元素的第n个元素节点，n为正返回后面的，n为负返回前面的
function retSibling(e, n) {
    while (n && e) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                e = e.nextSibling; //下一个兄弟节点
                while (e.nodeType != 1 && e)
                    e = e.nextSibling;
            }
            n--;
        } else {
            if (e.previousElementSibling)
                e = e.previousElementSibling;
            else {
                e = e.previousSibling; //上一个兄弟节点
                while (e.nodeType != 1 && e) {
                    e = e.previousSibling;
                }
            }
            n++;
        }
    }
    return e;
}
//在指定元素后面插入元素节点
Element.prototype.insertAfter = function (insert, afte) {
    var nextnode = afte.nextElementSibling;
    if (nextnode) {
        this.insertBefore(insert, nextnode);
    } else {
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
function getViewportOffset() {
    if (window.innerWidth) {
        console.log(11);
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode == "BackCompat") {
            console.log(1);
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            console.log(2);
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
//元素相对于文档的坐标
function getElementPosition(child) {
    if (!child) return {};
    var parent = child.offsetParent;
    if (parent == document.body) {
        return {
            x: child.offsetLeft,
            y: child.offsetTop
        }
    }
    return {
        x: parseInt(child.offsetLeft) + parseInt(getElementPosition(child.offsetParent).x),
        y: parseInt(child.offsetTop) + parseInt(getElementPosition(child.offsetParent).y)
    }
}
//返回元素的style
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}
//封装事件处理函数
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

//封装解除事件处理
function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}
//封装取消冒泡事件
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
//封装取消默认事件
function cancelHandle(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
//封装异步加载
function loadScript(url, callback) {
    var script = documnet.createElement('script');
    script.type = "text/javascript";

    if (script.readyState) { //ie
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                tools[callback]();
            }
        }
    } else { // Safari Opera chrome firefox
        script.onload = function () {
            tools[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

// 解析查询字符串 （?后面的）
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    var items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
var managerCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age' + time;
        return this;
    },
    removeCookie: function (name) {
        this.setCookie(name, '', -1);
    },
    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split(';');
        for (var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].trim().split('=');
            if (itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}

function ajax(method, url, callback, data, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log('error' + xhr.status);
            }
        }
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + data + '&timer=' + timer, flag);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}


//document.onclick = debounce(function(e){console.log(e);},1000);
//函数防抖  func执行触发函数  timer 等待时间  flag true为先执行后等 false 先等后执行
function debounce(func, time, flag) {
    var timer = null; //this指向window
    var debounced = function () {
        var that = this;         //指向出发事件的dom元素
        var argu = arguments[0]; // 事件event
        clearTimeout(timer);     
        if (flag) {              
            if (!timer) func.call(that, argu);
            timer = setTimeout(function () {
                timer = null;
            }, time);
        } else {
            timer = setTimeout(function () {
                func.call(that, argu);
            }, time);
        }
    }
    // 取消计时器
    debounce.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}
// 函数节流时间戳写法
// function throttle(func, wait) {
//     var lastTime = 0;
//     return function() {
//         var now = +new Date(); //获取当前时间戳
//         if(now - lastTime > wait){
//             func.call(this,arguments[0]);
//             lastTime = now;
//         }
//     }
// }

// 函数节流计时器写法
function throttle(func, wait) {
    var timer = null;
    return function () {
        var argu = arguments[0],
            that = this;
        if (!timer) {
            timer = setTimeout(function () {
                func.call(that, argu);
                timer = null;
            }, wait);
        }
    }
}

//兼容requestAnimationFrame  
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback,1000/60);
            };
}());
//兼容取消requestAnimationFrame  
window.cancelAnimationFrame = (function(){
    return window.CancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function(id) {
                window.clearTimeout(id);
            };
}());
// 封装promise
function myPromise(fn) {
    if(typeof fn !== 'function') {
        throw Error(`TypeError: $(fn) is not a function`);
    }
    var that = this;
    this.status = 'pending';
    this.data = null;
    this.resolvedArr = [];
    this.rejectedArr = [];
    function resolved(data) {
        setTimeout(function() {
            if(that.status === 'pending') {
                that.status = 'resolved';
                that.data = data;
                that.resolvedArr.forEach(fn => fn());
            }
        },0)
    }
    function rejected(data) {
        setTimeout(function() {
            if(that.status === 'pending') {
                that.status = 'rejected';
                that.data = err;
                that.rejectedArr.forEach(fn => fn());
            }
        }, 0)
    }
    fn(resolved, rejected);
}
myPromise.prototype.then = function (onResolved, onRejected) {
    var that = this;
    if(this.status === 'resolved') {
        return new myPromise((resolved, rejected) => {
            var res = onResolved(that.data);
            if(res instanceof myPromise) {
                res.then(resolved,rejected);
            }else {
                resolved(res);
            }
            
        })
    }
    if(this.status === 'rejected') {
        return new myPromise((resolved, rejected) => {
            var res = onRejected(that.data);
            if(res instanceof myPromise) {
                res.then(resolved,rejected);
            }else {
                resolved(res);
            }
        })
    }
    if(this.status === 'pending') {
        return new myPromise(function(resolved, rejected) {
            that.resolvedArr.push((function(onResolved) {
                return function() {
                    var res = onResolved(that.data);
                    if(res instanceof myPromise) {
                        res.then(resolved,rejected);
                    } else {
                        resolved(res);
                    }
                }
            })(onResolved))
            that.rejectedArr.push((function(onRejected) {
                return function() {
                    var res = onResolved(that.data);
                    if(res instanceof myPromise) {
                        res.then(resolved,rejected);
                    } else {
                        resolved(res);
                    }
                }
            })(onRejected))
        })
    }
}
//用apply封装bind
Function.prototype.myBind = function (context) {
    var _this = this,
        arg = Array.prototype.slice.call(arguments, 1);
    var fn = function () {
        var nowarg = Array.prototype.slice.call(arguments);
        return _this.apply(context, arg.concat(nowarg));
    }
    fn.prototype = {
        constructor:fn,
        __proto__:this.prototype
    }
    return fn;
}
//全排列
function fullPermutation(arr) {
    var flag = [];
    var answer = [];
    var len = arr.length,
        ans = 0,
        answerNow = [];
    answer[0] = [];
    (function(item) {
        item = item || 0;
        if(item == len) {
            Object.assign(answer[ans], answerNow);
            ans++  ;
            answer[ans] = [];
            return ;
        }
        for(var i=0; i<len; i++) {   
            if(!flag[i]) {                    
                answerNow[item] = arr[i];                  
                flag[i] = true;                     
                arguments.callee(item + 1);                     
                flag[i] = false;
            }
        }
        return ;
    }())    
    answer.pop();
    return answer;  
}
//冒泡排序
function maopao(arr) {
    var len = arr.length;
    for(var i=0; i<len; i++) {
        for(var j=i+1;j<len; j++) {
            if(arr[i]>arr[j]) {
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr;
}

//Promise解决Ajax异步
function ajax(method, url, data){
    var xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject){
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if(xhr.status == 200 || xhr.status == 304){
                    resolve(xhr.responseText);
                }else {
                    reject(xhr.status);
                }
            }
        }
    });
    xhr.open(method, url);
    xhr.send(data);
}


