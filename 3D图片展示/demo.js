var $Li = Array.prototype.slice.call($('li'));
$Li.forEach(function(elem,index) {
    elem.spec = getSpec(elem);
    $(elem).on('mouseenter',function(e) {
        addClass(e, this, 'in');
    });
    $(elem).on('mouseleave',function(e) {
        addClass(e, this, 'out');
    });
});
function getSpec(elem) {
    return {
        x: elem.offsetWidth,
        y: elem.offsetHeight
    }
}
function addClass(e, elem, str) {
    var x = e.offsetX - elem.spec.x/2;
    var y = e.offsetY - elem.spec.y/2;
    var deg = (Math.round((Math.atan2(y, x) * (180/Math.PI) + 180)/90) + 3)%4;
    var direction = '';
    switch(deg) {
        case 0:
            direction = '-top';
            break;
        case 1:
            direction = '-right';
            break;
        case 2:
            direction = '-bottom';
            break;
        case 3:
            direction = '-left';
            break;
    }
    elem.className = str + direction;
}
