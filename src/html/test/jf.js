var Ajax = {
    get: function (url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
                // 从服务器获得数据
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
};
var _hm = document.createElement("script");
_hm.src = "https://e-static.oss-cn-shanghai.aliyuncs.com/js/hammer.js";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(_hm, s);
//加载完hammer.js后开始执行
_hm.onload = function () {
    Ajax.get(
        "https://1905658906400513.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/getIp/getIp/",
        function (data) {
            console.log(JSON.parse(data));
            var data_ip = JSON.parse(data);
            /*
             *
             * 获取ip参数的值;
             */
            var ip = data_ip.data.ip;

            //定义滑动、点击、滑动、是否电量、剩余电量百分数初始变量
            var slide = 0;
            var click = 0;
            var shake = 0;
            var charging = 0;
            var battery_level = 0;
            var min = 360;
            var max = 0;
            var more_click = 0;
            var next_page_click = 0;
            /*
             *
             * 获取点击次数
             */
            var square = document.getElementsByTagName("body")[0];
            var manager = new Hammer.Manager(square);
            var Swipe = new Hammer.Swipe();
            var Tap = new Hammer.Tap({
                taps: 1,
            });
            manager.add(Tap);

            manager.on("tap", function (e) {
                click++;
            });

            /*
             *
             * 获取滑动次数
             */
            var EventUtil = {
                addHandler: function (element, type, handler) {
                    if (element.addEventListener)
                        element.addEventListener(type, handler, false);
                    else if (element.attachEvent)
                        element.attachEvent("on" + type, handler);
                    else element["on" + type] = handler;
                },
                removeHandler: function (element, type, handler) {
                    if (element.removeEventListener)
                        element.removeEventListener(type, handler, false);
                    else if (element.detachEvent)
                        element.detachEvent("on" + type, handler);
                    else element["on" + type] = handler;
                },
                /**
                 * 监听触摸的方向
                 * @param target            要绑定监听的目标元素
                 * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
                 * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
                 * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
                 * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
                 * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
                 */
                listenTouchDirection: function (
                    target,
                    isPreventDefault,
                    upCallback,
                    rightCallback,
                    downCallback,
                    leftCallback
                ) {
                    this.addHandler(target, "touchstart", handleTouchEvent);
                    this.addHandler(target, "touchend", handleTouchEvent);
                    this.addHandler(target, "touchmove", handleTouchEvent);
                    var startX;
                    var startY;

                    //触摸事件方法
                    function handleTouchEvent(event) {
                        switch (event.type) {
                            case "touchstart":
                                startX = event.touches[0].pageX;
                                startY = event.touches[0].pageY;
                                break;
                            case "touchend":
                                var spanX = event.changedTouches[0].pageX - startX;
                                var spanY = event.changedTouches[0].pageY - startY;

                                if (Math.abs(spanX) > Math.abs(spanY)) {
                                    //认定为水平方向滑动
                                    if (spanX > 10) {
                                        //向右
                                        if (rightCallback) rightCallback();
                                    } else if (spanX < -10) {
                                        //向左
                                        if (leftCallback) leftCallback();
                                    }
                                } else {
                                    //认定为垂直方向滑动
                                    if (spanY > 10) {
                                        //向下
                                        if (downCallback) downCallback();
                                    } else if (spanY < -10) {
                                        //向上
                                        if (upCallback) upCallback();
                                    }
                                }

                                break;
                            case "touchmove":
                                //阻止默认行为
                                if (isPreventDefault) event.preventDefault();
                                break;
                        }
                    }
                },
            };

            EventUtil.listenTouchDirection(
                window.parent,
                true,
                up,
                right,
                down,
                left
            );

            function up() {
                slide++;
            }

            function down() {
                slide++;
            }

            function right() {
                slide++;
            }

            function left() {
                slide++;
            }

            /*
             * navigator.getBattery=>设备的电量信息
             * 获取是否充电、剩余电量百分数
             */
            if (typeof navigator.getBattery != "undefined") {
                navigator.getBattery().then(function (battery) {
                    charging = battery.charging; //是否充电
                    battery_level = battery.level; //剩余电量百分数
                });
            }
            /*
             * 获取晃动角度
             * 监听设备晃动方向
             */
            window.parent.addEventListener(
                "deviceorientation",
                orientationHandler,
                false
            );

            //定义晃动角度方法
            function orientationHandler(event) {
                if (shake === 0) {
                    shake = Math.abs(event.beta);
                } else {
                    if (Math.abs(event.beta) > max) {
                        max = Math.abs(event.beta);
                    }
                    if (Math.abs(event.beta) < min) {
                        min = Math.abs(event.beta);
                    }
                    shake = max - min;
                }
            }

            /*
             *
             * 从url中获取参数的值;
             */
            function GetRequest(urlStr) {
                if (typeof urlStr == "undefined") {
                    var url = decodeURI(location.search);
                } else {
                    var url = "?" + urlStr.split("?")[1];
                }
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = decodeURI(
                            strs[i].split("=")[1]
                        );
                    }
                }
                return theRequest;
            }

            var params_first = GetRequest();

            //获取对象中的第一个值
            function getFirst(obj) {
                var n = 0;
                for (var key in obj) {
                    return obj[key];
                }
            }

            var url_first_param;
            if (getFirst(params_first)) {
                url_first_param = getFirst(params_first);
            }
            /*
             * 屏幕分辨率的宽： window.screen.width
             * 屏幕分辨率的高： window.screen.height
             */
            var screen_width = window.screen.width;
            var screen_height = window.screen.height;
            /*
             *
             * 判断设备是安卓还是ios 获取user_agent
             */
            var sys;
            var u = navigator.userAgent;
            var user_agent = u;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid) {
                sys = 1;
            } else if (isiOS) {
                sys = 2;
            } else {
                sys = 3;
            }
            var data = {};
            //注册包所有数据
            var reg_data = {
                url_param: url_first_param,
                charging_state: charging,
                screen_width: screen_width,
                screen_height: screen_height,
                battery_level: battery_level,
                sys: sys,
                user_agent: user_agent,
                ip: ip,
            };
            //心跳包所有数据
            var heart_beat_data = {};
            /*
             *
             * 建立websocket
             */
            var ws = new WebSocket("ws://ws.adz2020.cn:443");
            //正式地址：ws://ws.adz2020.cn:443
            //测试地址：ws://adz-api-test.you7h.com:1230
            ws.onopen = function () {
                reg_data.type = "reg";
                ws.send(JSON.stringify(reg_data));

                var _hmt = _hmt || [];
                (function () {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?a5b669d9910af5d1c681f699f81ddf86";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            };

            //每秒种循环通过WebSocket发送数据
            setInterval(function () {
                if (ws.readyState === ws.OPEN) {
                    heart_beat_data.type = "heartbeat";
                    heart_beat_data.click = click;
                    heart_beat_data.slide = slide;
                    heart_beat_data.shake = shake;
                    heart_beat_data.more_click = more_click;
                    ws.send(JSON.stringify(heart_beat_data));
                } else if (ws.readyState === ws.CLOSED) {
                    var _hmt = _hmt || [];
                    (function () {
                        var hm = document.createElement("script");
                        hm.src =
                            "https://hm.baidu.com/hm.js?ebff739c9c2c4d7398351b4b5ebe6703";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(hm, s);
                    })();
                    //连接失败，重新连接
                    //ws = new WebSocket("ws://127.0.0.1:1230");
                }
            }, 1000);

            //监听退弹
            window.addEventListener(
                "popstate",
                function (e) {
                    data.type = "ret";
                    ws.send(JSON.stringify(data));
                },
                false
            );

            //查看全文
            var more_ele = document.getElementById("more_btn");
            more_ele.addEventListener(
                "click",
                function (e) {
                    more_click = 1;
                },
                true
            );

            //下一章点击
            var next_page = document.getElementById("next_page");
            next_page.addEventListener(
                "click",
                function (e) {
                    data.type = "next_page_click";
                    ws.send(JSON.stringify(data));
                },
                true
            );

            //广告点击  监听单图和三图
            var ad_click = document.getElementById("adList");
            var ad_click_img3 = document.getElementById("ad-img3-list");
            ad_click.addEventListener(
                "click",
                function (e) {
                    data.type = "ad_click";
                    ws.send(JSON.stringify(data));
                },
                true
            );
            ad_click_img3.addEventListener(
                "click",
                function (e) {
                    data.type = "ad_click";
                    ws.send(JSON.stringify(data));
                },
                true
            );

            /*
             *
             * 获取url中的参数方法
             */
            function getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) {
                        return pair[1];
                    }
                }
                return false;
            }
        }
    );
};
