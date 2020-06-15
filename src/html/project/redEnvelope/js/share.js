$(function () {
    document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
        evt.preventDefault()
    }, {passive: false})
    audioAutoPlay("mp3");

    start()

    setTimeout(function() {
        $('#sum').show(10)
    }, 2000)
})

var mians;
var mainbox;
var main = []; //所有数据
var mainheight; //高
var mainwidth; //宽
var speed = 1; //速度
var golddh = null;
var goldimg;
var imgwidth = 35; //金币大小宽度



function audioAutoPlay(id){
    var audio1 = document.getElementById(id);
    audio1.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio1.play();
    }, false);
}


function sjMoneyNum(){
    var moneySjs = (Math.random() * 6000 + 6000) / 100;
    var moneyNum = moneySjs.toFixed(2);
    return moneyNum;
}
function remainMoneyNum(){
    var remainSjs = Math.random() * 600000 + 200000;
    var remainNum = remainSjs.toFixed(2);
    return remainNum;
}
function sjTimeAdd(){
    var now = new Date();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var c_minu = 0;
    var sjst = Math.floor(Math.random() * minu);
    if(sjst<10){
        sjst = "0"+sjst;
    }
    return hour+":"+sjst;
}

function start() {
    $('body').append('<img id="goldimg" ' +
        'src="http://allwebloction.yifutangvip.net/invite/assets/module1/icon1.png" />').append(
        '<canvas id="canvas" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0"></canvas>');
    $('#canvas').click(function () {
        $('.btn2').click();
    });
    mainheight = $('#canvas').height(); //高
    mainwidth = $('#canvas').width(); //宽
    goldimg = document.getElementById("goldimg");
    mians = document.getElementById("canvas");
    mainbox = mians.getContext("2d");
    $('#canvas').attr({
        width: $(window).width(),
        height: $(window).height()
    });
    // 开始动画   金币位置数据
    for (var i = 0; i < 70; i++) {
        main.push({
            x: randomNum(50, mainwidth - 50),
            y: randomNum(-800, 0),
            direction: Math.round(Math.random()) ? 'left' : 'right', //左右方向
            updown: 'down', //上下方向
            jump: randomNum(30, 80), //到底跳跃
            bottom: 0, //到底第几次
            jumpspeed: randomNum(5, 10), //跳跃速度
            downspeed: randomNum(15, 25), //下降速度
            leftright: randomNum(10, 15) //左右跳跃幅度
        });
    }
    playdh();
}

function playdh() {
    clearInterval(golddh);
    window.requestAnimationFrame(function () {

        for (var i = 0; i < main.length; i++) {
            var item = main[i];
            item.direction == "left" ? item.x -= item.leftright / 10 : item.x += item.leftright / 10;
            var thisspeed = item.bottom >= 1 ? item.jumpspeed : item.downspeed;

            if (item.y >= mainheight - imgwidth) {
                //金币到底到底

                if (item.bottom == 0) {
                    // 第一次到底 反向
                    item.bottom = 1; //增加到底次输
                    item.updown = 'up';
                }
                if (item.bottom == 2) {
                    main.splice(i, 1);
                    if (main.length == 0) {
                        clearInterval(golddh);
                        $('#goldimg').remove();
                        $('#canvas').remove();
                    }
                }
            }

            if (item.bottom == 1) {
                item.jump -= 3;
                // console.log(item.jump)
                if (item.jump <= 0) {
                    // 反向到底
                    item.updown = 'down';
                    item.bottom = 2;
                }
            }
            item.updown == "down" ? item.y += thisspeed : item.y -= thisspeed;
        }
        mainbox.clearRect(0, 0, mainwidth, mainheight);
        draw(main);
    });
}

function draw(e) {
    for (var i = 0; i < e.length; i++) {
        var item = e[i];
        mainbox.drawImage(goldimg, item.x, item.y, imgwidth, imgwidth);
    }
    playdh();
}

function randomNum(minNum, maxNum) {
    // 随机数
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


