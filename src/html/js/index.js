const list = [ // 随机留言
    {src: '../img/xtx/1.jpg', name: '次日图捏'}, {
        src: '../img/xtx/2.jpg',
        name: 'laneud'
    }, {src: '../img/xtx/3.jpg', name: '开诶女聪明'}, {
        src: '../img/xtx/4.jpg',
        name: '奥Y他们'
    }, {src: '../img/xtx/5.jpg', name: '拉开日~'}, {
        src: '../img/xtx/6.jpg',
        name: 'NFHEY楷模'
    }, {src: '../img/xtx/7.jpg', name: '默默的爱'}, {
        src: '../img/xtx/8.jpg',
        name: '本田销售'
    }, {src: '../img/xtx/9.jpg', name: '小妞儿'}, {
        src: '../img/xtx/10.jpg',
        name: 'MK-星图'
    }, {src: '../img/xtx/11.jpg', name: '猪猪侠'}, {
        src: '../img/xtx/12.jpg',
        name: '宝贝'
    }, {src: '../img/xtx/13.jpg', name: '左左妈妈'}, {
        src: '../img/xtx/14.jpg',
        name: '大量收号'
    }, {src: '../img/xtx/15.jpg', name: '吃遍天下无敌手'}, {
        src: '../img/xtx/16.jpg',
        name: '情归何处'
    }, {src: '../img/xtx/17.jpg', name: '小亮儿奶奶'}, {
        src: '../img/xtx/18.jpg',
        name: '柳暗花明'
    }, {src: '../img/xtx/19.jpg', name: 'pangeOne'},
    {src: '../img/xtx/20.jpg', name: '周..'}
]

var sjm = sjMoneyNum()
var sjt = sjTimeAdd()

$('#money').html('￥' + sjMoneyNum())
$('#sx').html(remainMoneyNum() + '元')

$(function () {
    // 插入列表数据
    $('#comment1s').html('')
    var tempList = JSON.parse(JSON.stringify(list))
    var html = ''
    $.each(tempList, function (key, val) {
        html +=
            '<div style="border-bottom: 1px solid #eee;padding-bottom: 0.6rem;padding-top: 0.6rem" >' +
            '<img style="border-radius: 0.5rem;width: 3rem;' +
            'margin-right: 0.5rem" src=' + tempList[key].src + ' class="">' +
            '<div class=""  style="margin-left: 18%;margin-top: -15%;">' +
            '<p class="margin-bottom-sm">' + tempList[key].name + '</p>' +
            '<p>' + sjt + '</p>' +
            '</div>' +
            '<span class="text-bold fr" style="margin-top: -2rem;">' + sjMoneyNum() + '元</span>' +
            '</div>'
    })
    $('#comment1s').append(html)

    // 免接口分享
    // var ad_url = "<?= $advertising ?>";
    var shareATimes = 0;
    var shareTTimes = 0
    var hiddenProperty = 'hidden' in document ? 'hidden'
        : 'webkitHidden' in document ? 'webkitHidden'
            : 'mozHidden' in document ? 'mozHidden'
                : null
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    var onVisibilityChange = function () {
        if (!document[hiddenProperty]) {
            window.show_time = Date.now()
            if (show_time - hidden_time > 1000) {
                // if (show_time - hidden_time > 0) {
                shareATimes += 1
                if (shareATimes > 4) {
                    shareTTimes += 1
                    setTimeout(share_tip(shareATimes, shareTTimes), 1500)
                } else {
                    setTimeout(share_tip(shareATimes, -1), 1500)
                }
            } else {
                // alert('分享失败')
            }
        } else {
            window.hidden_time = Date.now()
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange) // 监听

    function share_tip(share_app_times, share_timeline_times) { // 分享处理
        if (share_timeline_times == -1) {
            if (shareATimes == 1) {
                $('#modal').css('animation', 'shakeOne 2s 2 linear')
                $('#gxn').html('发送成功！')
                $('.hideMes').html('')
                $('#gxn').css('font-size', '1.2rem')
                $('#mess').html('请继续发送到<span class="text-bold text-red text-xxl"> 2 </span>个微信群')
            } else if (shareATimes == 2) {
                $('#modal').css('animation', 'shakeTwo 2s 2 linear')
                $('#gxn').html('发送失败！')
                $('#gxn').css('color', 'red')
                $('.hideMes').html('')
                $('#gxn').css('font-size', '1.2rem')
                $('#mess').html('发送到相同的群会失败，请重新发送到<span class="text-bold text-red text-xxl">不同的群</span>')
            } else if (shareATimes == 3) {
                $('#modal').css('animation', 'shakeThree 2s 2 linear')
                $('#gxn').html('发送成功！')
                $('.hideMes').html('')
                $('#gxn').css('font-size', '1.2rem')
                $('#mess').html('请继续发送到<span class="text-bold text-red text-xxl"> 1 </span>个微信群')
            } else if (shareATimes == 4) {
                $('#modal').css('animation', 'shakeFour 2s 2 linear')
                $('#gxn').html('分享成功！')
                $('.hideMes').html('')
                $('.hideMess').html('')
                $('#gxn').css('font-size', '1.2rem')
                $('#tempText').html('由于领取人数较多，请耐心等待，24小时内会自动存入你的零钱')
                $('#mess').html('恭喜你获得<span class="text-bold text-red text-xxl"> ' + sjMoneyNum() + ' </span>')
                setTimeout(function () {
                    window.location.href = 'http://www.baidu.com'
                }, 3000)
            }
        } else {
            setTimeout(function () {
                console.log(1111)
            }, 0)
        }
    }
})

function jumpAd() {
    window.location.href = 'http://www.baidu.com'
}

// 生成二维码
var qrcode = $('#qrcode').qrcode({
    width: 100,
    height: 100,
    text: 'https://www.baidu.com/'
})
var canvas1 = qrcode.find('canvas').get(0) // 得到合成图片的路径

setTimeout(() => { // 留言滚动
    roll(20)
}, 1000)

setTimeout(() => {
    $('#modal').css('opacity', 1)
    $('#figure').css('opacity', 1)
}, 2000)

drawAndShareImage() // 图片合成
audioAutoPlay('mp3')

setTimeout(function () {
    document.getElementsByClassName('daoztx')[0].style.visibility = 'hidden'
}, 3000)

function drawAndShareImage() {
    var canvas = document.createElement('canvas')
    canvas.width = 900
    canvas.height = 1650
    var context = canvas.getContext('2d')

    context.rect(0, 0, canvas.width, canvas.height)
    // context.fillStyle = "black";
    context.fill()

    var myImage = new Image()
    myImage.src = '../img/poster.png' // 背景图片  你自己本地的图片或者在线图片
    myImage.crossOrigin = 'Anonymous'

    myImage.onload = function () {
        context.drawImage(myImage, 0, 0, 900, 1650)

        var myImage2 = new Image()
        myImage2.src = canvas1.toDataURL('image/jpg') // 你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous'

        myImage2.onload = function () {
            context.drawImage(myImage2, 280, 950, 340, 340)
            var base64 = canvas.toDataURL('image/png') // "image/png" 这里注意一下
            var img = document.getElementById('avatar')

            // document.getElementById('avatar').src = base64;
            img.setAttribute('src', base64)
        }
    }
}

function audioAutoPlay(id) {
    var audio1 = document.getElementById(id)
    audio1.play()
    document.addEventListener('WeixinJSBridgeReady', function () {
        audio1.play()
    }, false)
}

function sjTimeAdd() {
    var now = new Date()
    var hour = now.getHours()
    var minu = now.getMinutes()
    var c_minu = 0
    var sjst = Math.floor(Math.random() * minu)
    if (sjst < 10) {
        sjst = '0' + sjst
    }
    return hour + ':' + sjst
}

function roll(t) {
    var ul1 = document.getElementById('comment1s')
    var ul2 = document.getElementById('comment2s')
    var ulbox = document.getElementById('review_boxs')

    ul2.innerHTML = ul1.innerHTML
    ulbox.scrollTop = 0 // 开始无滚动时设为0
    var timer = setInterval(rollStart, t) // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快

    // 鼠标移出div后继续滚动
    ulbox.onmouseout = function () {
        timer = setInterval(rollStart, t)
    }
}

function rollStart() { // 开始滚动函数
    // 上面声明的DOM对象为局部对象需要再次声明
    var ul1 = document.getElementById('comment1s')
    var ul2 = document.getElementById('comment2s')
    var ulbox = document.getElementById('review_boxs')
    // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
    if (ulbox.scrollTop + 1 >= ul1.scrollHeight) {
        ulbox.scrollTop = 0
    } else {
        ulbox.scrollTop++
    }
}

function sjMoneyNum() {
    var moneySjs = (Math.random() * 6000 + 6000) / 100
    var moneyNum = moneySjs.toFixed(2)
    return moneyNum
}

function remainMoneyNum() {
    var remainSjs = Math.random() * 600000 + 200000
    var remainNum = remainSjs.toFixed(2)
    return remainNum
}
