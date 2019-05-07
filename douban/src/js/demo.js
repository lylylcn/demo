(function () {
    var $search = $('.search'),
        $ul = $('.nav-list > ul'),
        num = 7;
    console.log($search);
    $search.on('input', function() {
        var value = $(this).val();
        console.log(value);
        getData(value);
    });

    function getData(value) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            data: 'q=' + value + '&count=' + num,
            dataType: 'jsonp',
            success: addItem
        });
    }
    function addItem(data) {
        var datalist = data.musics;
        $ul.empty();
        console.log(datalist);
        var str = '';
        datalist.forEach(function(elem,index) {
            var author = '';
            for(var i=0; i<elem.author.length; i++){
                if(author.length>10) {
                    author += '...';
                    break;
                }

                if(i === 0){
                    author += elem.author[i].name;
                }else {
                    author += (',' + elem.author[i].name);
                }
            }
            console.log(author);
            if(elem.title.length>10)
                elem.title = elem.title.slice(0,10) + '...';
            str += '<li><a href="'+ elem.mobile_link +'"><img src="' + elem.image  + '"><em class="top">'+ elem.title+'</em><em class="bottom">'+ author+'</em></a></li>';
        });
        console.log(str);
        $ul.append(str);
    }
} ());