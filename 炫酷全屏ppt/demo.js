var ppt={
    $wrapper:$(".wrapper"),
    $slider:$(".slider"),
    len:$(".slider").length,
    lastItem:undefined,
    nowItem:0,
    flag: false,
    timer: undefined,
    init: function() {
        if(this.len>1){
            this.createDom(this.len);
            this.bindEvent();
            this.slider_auto();
        }
    },
    createDom: function(len) {
        var strLi = "<div class='slider-order'><ul>",
            strBtn = '<div class="slider-btn">\
            <div class="left-btn"></div>\
            <div class="right-btn"></div>\
            </div>';
        for(var i=0;i<len;i++){
            if(!i){
                strLi += "<li class='active'></li>";
            }else{
                strLi += "<li></li>";
            }
        }
        strLi += "</ul>"; 
        this.$wrapper.append(strLi).append(strBtn);
    },
    bindEvent: function() {
        var that = this;
        $('.left-btn').add($('.right-btn')).add($('.slider-order li')).on('click',function() {
            if($(this).attr('class') == 'left-btn'){
                that.tool('left');
            }else if($(this).attr('class') == 'right-btn'){
                that.tool('right');
            }else {
                var item = $(this).index();
                that.tool(item);
            }
        });
        this.$slider.on('go', function() {
            $(this).fadeOut(300)
                .find($('p')).delay(300).animate({fontSize:"16px"}).end();
            $(this).find($('.image')).delay(300).animate({width:'0%'});
        });
        this.$slider.on('come', function() {
            $(this).delay(300).fadeIn(300)
                .find($('p')).delay(300).animate({fontSize:"20px"}).end();
            $(this).find($('.image')).delay(300).animate({width:'35%'},function() {
                that.flag = false;
            });            
        });
    },
    getIndex: function(direction) {
        this.lastItem = this.nowItem;
        if(direction == 'left') {
            this.nowItem = (this.nowItem - 1 + this.len) % this.len;
        }else if(direction == 'right') {
            this.nowItem = (this.nowItem + 1) % this.len;
        }else {
            this.nowItem = direction;
        }
    },
    changeorder: function(index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    tool: function(direction) {
        this.getIndex(direction);
        if(this.nowItem !== this.lastItem && !this.flag){
            this.flag = true;
            this.changeorder(this.nowItem);
            this.$slider.eq(this.lastItem).trigger('go');
            this.$slider.eq(this.nowItem).trigger('come');
            clearTimeout(this.timer);
            this.slider_auto();
        }  
    },
    slider_auto: function() {
        var that = this;
        this.timer = setTimeout(function() {
            that.tool('right');
        },3000);
    }
};
ppt.init();



