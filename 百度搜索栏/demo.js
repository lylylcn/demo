var oInput = document.getElementsByTagName('input')[0],
    oUl = document.getElementsByTagName('ul')[0];
var url = 'https://www.baidu.com/sugrec?';//prod=pc&wd=abcd&cb=aa
oInput.oninput = debounce(getUserAction,3000,false);
function getUserAction(e) {
    var value = this.value;
    console.log(value);
    var oScript = document.createElement('script');
    oScript.src = url + 'prod=pc&wd=' + value + '&cb=handle';
    document.body.appendChild(oScript);
};
oInput.onkeydown = function(e) {
    var event = e||window.event;
    if(event.keyCode == 13){
        var value = this.value;
        var str = 'https://www.baidu.com/s?wd=' + value;
        window.open(str);
    }
};
function handle(data) {
    if(typeof data.g !== 'undefined'){
        var arr = data.g;
        var str = '';
        arr.forEach(function(ele, index) {
            str += '<li><a href="https://www.baidu.com/s?wd=' + ele .q +'">' + ele.q + '</a></li>' ;
        });
        oUl.innerHTML = str;
        oUl.style.display = 'inline-block';
    }else {
        oUl.style.display = 'none';        
    }
}
