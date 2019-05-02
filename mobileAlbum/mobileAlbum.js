var total = 12,
    activeIndex,
    lHeight = ($('.wrapper').width() - 24) / 4,
    bl = $(window).height() / $(window).width();

function render() {
    var str = "";
    for (var i = 0; i < total; i++) {
        str += "<li style='height:" + lHeight + "px'><img src='./images/img" + (i + 1) + ".jpg'></li>";
    }
    $(str).appendTo($('.wrapper')).animate({
        opacity: 1
    }, 500);
}
render();
$('ul').on('tap', 'li', function () {
    activeIndex = $(this).index();
    show(activeIndex);
});

function show(activeIndex) {
    $('.show').show().html('');
    var oImg = new Image();
    oImg.src = "./images/img" + (activeIndex + 1) + ".jpg";
    oImg.onload = function () {
        console.log(this);
        var w = this.width;
        var h = this.height;
        if (h / w > bl) {
            $(this).appendTo($('.show')).css('height', '100%').animate({
                opacity: 1
            }, 500);
        } else {
            $(this).appendTo($('.show')).css('width', '100%').animate({
                opacity: 1
            }, 500);
        }
    }
}
$('.show')
    .on('tap', function () {
        $(this).hide();
    })
    .on('swipeLeft', function () {
        activeIndex = (activeIndex + 1) >= total ? total - 1 : activeIndex + 1;
        show(activeIndex);
    })
    .on('swipeRight', function () {
        activeIndex = (activeIndex - 1) < 0 ? 0 : activeIndex - 1;
        show(activeIndex);
    })