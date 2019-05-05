// ajax('GET', 'http://localhost/waterfull/src/js/getPics.php', callback, 'cpage=0', true);

// function callback(data) {
//     console.log(JSON.parse(data));
// }


(function() {
    var oLi = document.getElementsByClassName('box'),
        flag = false,
        imageW = 200,
        num = 1;

    function init() {
        if (!flag) {
            flag = true;
            ajax('GET', 'http://localhost/waterfull/src/js/getPics.php', callback, 'cpage=' + num, true);
            num++;
        }
    }
    init();

    function callback(data) {
        // console.log(data);
        var dataList = JSON.parse(data);
        // console.log(dataList);
        // console.log('2222222   ' + num);
        dataList.forEach(function(elem, index) {
            var oItem = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p'),
                oContent = document.createElement('div');
            oItem.className = 'item';
            oContent.className = 'content';
            if (index == 0) {
                oImg.src = elem.download_url + 'agc';
            } else {
                oImg.src = elem.download_url;
            }
            oImg.height = elem.height * imageW / elem.width;
            oContent.style.height = elem.height * imageW / elem.width + 'px';
            oP.innerText = elem.author;
            oImg.onerror = function() {
                this.style.margin = '-1px';
                this.style.width = '202px';
                oImg.height = elem.height * imageW / elem.width + 2;
            };

            oContent.appendChild(oImg);
            oItem.appendChild(oContent);
            oItem.appendChild(oP);
            var item = getMinList(oLi);
            // console.log(item);
            oLi[item].appendChild(oItem);
            // console.log(index);
        });
        // console.log(3333333);
        flag = false;
    }

    function getMinList(dom) {
        var minn = dom[0].offsetHeight,
            item = 0;
        for (var i = 1; i < dom.length; i++) {
            var height = dom[i].offsetHeight;
            if (minn > height) {
                minn = height;
                item = i;
            }
        }
        return item;
    }

    window.onscroll = function() {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var pageHeight = oLi[getMinList(oLi)].offsetHeight;
        // console.log(scrollHeight + " " + clientHeight + " " + pageHeight);
        if (scrollHeight + clientHeight > pageHeight) {
            // console.log(111111);
            // console.log(num);
            init();
        }
    }
}());