var nowIndex = 0,
    len = $('.item').length,
    w = $(".wrapper").width(),
    timer = undefined,
    flag = false;

function init() {
    bindEvent();
    image_auto();
}

function bindEvent() {
    $('.leftBtn').add($('.rightBtn')).add('.item').on('click', function () {
        if ($(this).attr('class') === 'leftBtn') {
            move('prev');
        } else if ($(this).attr('class') === 'rightBtn') {
            move('next');
        } else {
            var index = $(this).index();
            move(index);
        }
    });
}

function move(dierction) {
    if (!flag) {
        flag = true;
        var a = 0;
        if (dierction === 'prev') {
            if (nowIndex === 0) {
                $('.image').css({
                    left: -(w * len)
                });
                nowIndex = len - 1;
            } else {
                nowIndex -= 1;
            }
        } else if (dierction === 'next') {
            if (nowIndex === len - 1) {
                nowIndex += 1;
                $('.image').animate({
                    left: -(nowIndex * w)
                }, function () {
                    $(this).css({
                        left: 0
                    });
                    flag = false;
                    clearTimeout(timer);
                    image_auto();
                });
                nowIndex = 0;
                a = 1;
            } else {
                nowIndex += 1;
            }
        } else {
            nowIndex = dierction;
        }
        changeOrderStyle(nowIndex);
        if(!a){
            $('.image').animate({
                left: -(nowIndex * w)
            }, function () {
                flag = false;
                clearTimeout(timer);
                image_auto();
            });
        }
    }
    $(".wrapper")
        .on('mouseover', '.image', function() {
            clearTimeout(timer);
            $(".btn").show();
        })
        .on('mouseover', '.btn', function() {
            $(".btn").show();
        })
        .on('mouseout', '.image', function() {
            clearTimeout(timer);
            image_auto();
            $('.btn').hide();
        })
        .on('mouseout', '.btn', function() {
            $('.btn').hide();
        });
}

function changeOrderStyle(index) {
    $(".active").removeClass('active');
    $(".item").eq(index).addClass('active');
}

function image_auto() {
    timer = setTimeout(function () {
        move('next');
    }, 3000);
}
init();