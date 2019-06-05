require('../less/goodsInfo.less');
require('./goodsCover.js');
function getGoodsInfo() {
    $.ajax({
        type: 'GET',
        url:'http://localhost:8080/api/goodsList.json',
        success: function(data) {
            createGoodsInfo(data);
        },
        error: function() {
            console.log(error);
        }
    })
}
function createGoodsInfo(data) {
    var id = getId();console.log(111);
    var len,
        str = "",
        liStr = "";
    data.list.forEach(function(elem, index) {
        if(elem.id == id) {
            $('.infor_one_img').html('<img src="'+elem.imgurl[0]+'"></img>')
            $('.one_name').html(elem.name);
            console.log(222);
            console.log(elem);
            elem.spectList.sort(order);
            len = elem.spectList.length;
            if(len==1)  $('.one_price').html("￥"+elem.spectList[0].price);
            else $('.one_price').html("￥"+elem.spectList[0].price + "~" +"￥"+elem.spectList[len-1].price);
            $('.infor_th').append($(str));
            elem.imgurl.forEach(function (ele, index) {
                str += '<img src="'+ ele +'"/>';
            });
            $('.infor_th').append($(str));
            elem.spectList.forEach(function (ele, index) {
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>';
            });
            $('.buy_spect_wrap ul').html(liStr);
        }
    });
}
function order(a,b){
    return a.price-b.price;
}
function getId() {
    console.log(79);
    var optionList = window.location.search.slice(1).split('&');
    console.log(optionList);
    for(var i = 0; i < optionList.length; i ++) {
        if(optionList[i].indexOf('id=') !== -1){
            return optionList[i].slice(3);
        }
    }
}
getGoodsInfo();
function bindEvent() {
    $('.infor_fo').on('click',function(e) {
        $('.buy_wrap').css({'display':'block'});
        $('html').css({'height':'100%',over:'hidden'});
    });
    $('.buy_gray').on('click',function() {
        $('.buy_wrap').css({'display':'none'});
        $('html').css({'height':'100%',over:'visible'});
    });
}
bindEvent();
