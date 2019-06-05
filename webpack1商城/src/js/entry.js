require('../less/index.less');
require('jquery');
console.log(456);
function getGoodsList(){
    console.log($);
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/api/goodsList.json',
        success: function(data) {
            createList(data);
        },
        error: function() {
            console.log("error");
        }
    });
}
getGoodsList();
function createList(data) {
    var str = "";
    data.list.forEach(function(elem, index) {
        str += '<a href="http://localhost:8080/goodsInfo.html?id='+ elem.id +'"' + '><div class="goods_item">\
            <img src=' + elem.imgurl[0] + ' alt="">\
            <p class="item_name">' +
                 elem.name + '</p>\
            <p class="item_price">' +
               elem.spectList[0].price + '</p>\
        </div></a>';
    });
    $('.tab_content').append(str);
}

