var main = document.getElementsByClassName('main')[0];
var startgame = document.getElementsByClassName('startgame')[0];
var btn=document.getElementById('btn');
var gameover=document.getElementsByClassName('gameover')[0];
var span=document.getElementsByTagName('span')[0];
init();

function init() {
    this.mapW = parseInt(getStyle(main, 'width'));
    this.mapH = parseInt(getStyle(main, 'height'));
    //food
    this.foodW = 20;
    this.foodH = 20;
    this.fooX=0;
    this.foodY=0;
    //snack
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakebody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    this.direction = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    this.timer=null;
    addEvents();
}

function addEvents(){
    addEvent(startgame, 'click', startGame);
    addEvent(btn,'click',changeState);
    addEvent(span,'click',end);
}
//暂停还是开始
function changeState(){
    var state=btn.className;
    if(state=="btn1"){
        btn.className="btn2";
        clearInterval(timer);
    }else {
        btn.className="btn1";
        timer=setInterval(move,500);
    }
}

//创建食物
function createFood() {
    var food = document.createElement('div');
    foodX = Math.floor(Math.random() * (mapW / 20));
    foodY = Math.floor(Math.random() * (mapH / 20));
    food.style.left = foodX * 20 + "px";
    food.style.top = foodY * 20 + "px";
    // console.log(foodX + " " + foodY);
    main.appendChild(food).setAttribute('class', 'food');
}
//创建蛇
function snake() {
    for (var i = 0; i < snakebody.length; i++) {
        var snakediv = document.createElement('div');
        snakediv.style.left = snakebody[i][0] * 20 + "px";
        snakediv.style.top = snakebody[i][1] * 20 + "px";
        snakediv.classList.add(snakebody[i][2]);
        main.appendChild(snakediv).classList.add('snake');
    }
}

function move() {
    for (var i = snakebody.length - 1; i > 0; i--) {
        snakebody[i][0] = snakebody[i - 1][0];
        snakebody[i][1] = snakebody[i - 1][1];
    }
    removeClass('snake');
    switch (direction) {
        case 'left':
            snakebody[0][0] = snakebody[0][0] - 1;
            break;
        case 'right':
            snakebody[0][0] = snakebody[0][0] + 1;
            break;
        case 'up':
            snakebody[0][1] = snakebody[0][1] - 1;
            break;
        case 'down':
            snakebody[0][1] = snakebody[0][1] + 1;
            break;
        default:
            break;
    }
    snake();
    changeEvent();
    // console.log(snakebody[0][0]+" "+snakebody[0][1]);
    if(foodX==snakebody[0][0]&&foodY==snakebody[0][1]){
        eatFood();
    }
    if(!checkKnock()){
        gameOver();
    }
}
//删除蛇
function removeClass(className) {
    var element = document.getElementsByClassName(className);
    var len=element.length;
    for(var i=len-1;i>=0;i--){
        element[i].parentElement.removeChild(element[i]);
    }
}
//改变方向
function changeDirection(e) {
    var event=e||window.e;
    var code=event.keyCode;
    switch (code) {
        case 37:
            if (left) {
                left = !left;
                right = !right;
                up = !up;
                down = !down;
                direction='left';
            }
            break;
        case 38:
            if (up) {
                left = !left;
                right = !right;
                up = !up;
                down = !down;
                direction='up';
            }
            break;
        case 39:
            if (right) {
                left = !left;
                right = !right;
                up = !up;
                down = !down;
                direction='right';
            }
            break;
        case 40:
            if (down) {
                left = !left;
                right = !right;
                up = !up;
                down = !down;
                direction='down';
            }
            break;
        default:
            break;
    }
}

function changeEvent() {
    var snakehead = document.getElementsByClassName('head')[0];
    addEvent(document, 'keydown',changeDirection);
}
//吃到食物
function eatFood(){
    var food=document.getElementsByClassName('food')[0];
    console.log(food);
    food.className="";
    createFood();
    var x=snakebody[snakebody.length-1][0];
    var y=snakebody[snakebody.length-1][1];
    snakebody.push([x,y,'body']);
}
// 检测碰撞
function checkKnock(){
    var x=snakebody[0][0];
    var y=snakebody[0][1];
    for(var i=1;i<snakebody.length;i++){
        if(snakebody[i][0]==x&&snakebody[i][1]==y){
            return false;
        }
    }console.log(x+" "+y);
    if(x<0||x>=mapW/20||y<0||y>=mapH/20){
        return false;
    }
    return true;
}
//游戏结束
function gameOver(){
    gameover.className+=' gameovershow';
    clearInterval(timer);
}

function end(){
    btn.className="";
    gameover.className="gameover";
    removeClass('snake');
    removeClass('food');
    startgame.className="startgame";
    init();
}

function startGame() {
    startgame.className ="";
    btn.className="btn1";
    createFood();
    snake();
    timer=setInterval(move, 200);
}