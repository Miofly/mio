var vc = {

  // 当前播放的视频
  videoDom: null,

  // 视频是否在播放中
  isPlaying: false,

  // 判断uv准确性
  uvNew: false,

  // 判断play维度
  effect: 0.2,
  playNew: false,

  // 判断是否为第一次点击
  fristClick: false,

  // 视频加载失败次数
  errNum: 0,

  videoDom: null,

  // 请求视频次数
  reqNum: 0,

  // 二维码弹框显示的准确性
  codeShow: true,
  isCode: false,
  codeTrue: false,

  // 判断是否为silde选择视频
  sildeTrue: false,

  autoplayClick: false,

  // 水印时间
  watermarkTime: 3.5,

  // 视频索引
  videoIndex: 0,

  // 当前视频是否已经切换为默认视频
  default_videos: false,

  // 当前状态发生变化时的视频对象
  changeVideo: {
    event: 'video',
    video_id: video_id,
    pv:0, //视频被显示的次数
    uv: 0, //播放0-50%的次数
    play:0, //播放 50%-100% 的次数
    repeat:0, //视频播放满100%的次数
    like:0, //点赞
    share:0, //分享次数
    ret:0, //返回 看更多
  },

  // 是否隐藏
  hideOff: false,

  // 防刷
  forceArray: [],
  sendNum: 0,
  itemNum: 0,
  sendOnoff: true,
  Arrlength: 0,
  pressArr: [],

  moveArr: [],


  // 获取地址栏参数
  getParam: function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  },
  // websocket 发送消息
  sendWs: function (params) {
    if (ws.readyState == 1) {
      ws.send(JSON.stringify(params))
    }
  },
  // 加载视频
  loadVideo: function (param) {
    vc.uvNew = true;
    vc.playNew = true;
    // 加载完毕 pv + 1
    vc.changeVideo.pv += 1;
    
    vc.sendWs(vc.changeVideo)

    $('.loading-box').show();

    if (system == 1) {
    } else {
      setTimeout(function () {
        $('.loading-box').hide();
      }, 2000)
    }
    // loading
    param.oncanplay = function() {
      $('.loading-box').hide();
      param.play();
    }
    param.onended = function() {
      vc.uvNew = true;
      vc.playNew = true;
      vc.changeVideo.repeat += 1;
      vc.changeVideo.pv += 1;
      vc.sendWs(vc.changeVideo)
      // param.play();
      vc.changeVideoEvent();
    };
    // 视频播放中
    param.ontimeupdate = function() {
      

      var currentTime = param.currentTime;
      var duration = param.duration;
      // 时间在0-50% uv+1
      if (currentTime > 1 && vc.uvNew) {
        vc.uvNew = false;
        vc.changeVideo.uv += 1; // uvNum+1
        vc.sendWs(vc.changeVideo);
      }


      // 有效播放次数+1
      if (duration && currentTime >= duration * vc.effect && vc.playNew) {
        vc.playNew = false;
        vc.changeVideo.play += 1;
        vc.sendWs(vc.changeVideo);
      }

      // 设为播放中
      if (duration && currentTime > 0.15) {
        vc.isPlaying = true;
      }
      
      if (!vc.autoplayClick && duration) {
        $('#see-more').hide();
        $('#video-dom').css('height', '100vw');
        $('.play-btn').hide();
        $('.share-box').show();
      }

      if (!vc.isPlaying) {
        // 处理可以自动播放的手机
        $('#see-more').hide();
        $('#video-dom').css('height', '100vw');
        $('.play-btn').hide();
        $('.share-box').show();
      }

      // 进度条
      $('.line').css({
        width: Math.ceil((currentTime / duration) * 100) + '%'
      });

      // 判断用户二维码是否显示
      if (duration && currentTime >= duration * vc.effect && vc.codeShow && vc.isCode && vc.codeTrue) {
        $('.userCode').show();
      }
      
      // 快转和测试环境配置二维码

      if (duration && currentTime >= duration * vc.effect && vc.codeShow && vc.isCode && (BASE.name == 'dev_local' || BASE.name == 'kuaizhuan')) {
        $('.userCode').show();
      }

    };
  },

  /**
   * 视频播放结束弹窗
   */
  changeVideoEvent: function () {
    $('.endBox').css({ 'z-index': 100000, 'opacity': 1});
  },

  hideVideo: function () {
    $('.endBox').css({ 'z-index': 0, 'opacity': 0});
  },

  /**
   * 视频错误处理
   */
  onVideoError: function() {
    vc.errNum += 1;
    $('.videoError').show();
    $('.videoError').click(function () {
      var videoDom = $('#video');
      var playUrl = videos[vc.errNum].play_address;
      err_id = videos[vc.errNum].id;
      videoDom.attr('src', playUrl);
      vc.loadVideo(vc.videoDom);
      $(this).hide();
    })
      
  },
  
  // 处理视频播放和暂停
  playOrPause: function (param) {
    if (vc.isPlaying) {
      param.video.pause();
      setTimeout(function() {
        vc.isPlaying = false;
      });

      $('.play-btn').show();
      $('.share-box').hide();
      return;
    }

    param.video.play();
    vc.isPlaying = true;
    $('.play-btn').hide();
    $('.share-box').show();
  },
  
  // 点赞数
  likeNum: function (likeNum) {
    if (likeNum > 9999) {
      likeNum = (Math.floor(likeNum / 100)) / 100 +'w';
    }
    return likeNum;
  },

  /**
   * 反弹
   * @param {*} url
   * @returns
   */
  back: function(url, callback) {
    if(navigator.userAgent.indexOf('Android') != -1){
      history.pushState(history.length+1, "message", window.location.href.split('#')[0]+"#"+new Date().getTime());
        if(typeof(tbsJs) != "undefined"){
            tbsJs.onReady('{useCachedApi : "true"}', function(e) {})
            window.onhashchange=function(){
              callback && callback();
              setTimeout(function () {
                top.location.href = url;
              }, 10)
        	};
        }else{
            var pop = 0;  
            window.onhashchange = function(event) {
                pop++
                callback && callback();
                setTimeout(function () {
                  if (pop >= 3) {
                      location.href = url;
                  }else{
                      history.forward();
                  }
                }, 10)
    		};
    		history.back(-1)
        }
    }else{
      // window.onhashchange=function(){
      //   callback && callback();
      // };
    }
  },

  /**
   * 删除地址栏中置顶参数
   * @param {*} name 
   */
  funcUrlDel: function (name) {
　　var loca = parent.location;
　　var baseUrl = loca.origin + loca.pathname + "?";
　　var query = loca.search.substr(1);
　　if (query.indexOf(name)>-1) {
　　　　var obj = {}
　　　　var arr = query.split("&");
　　　　for (var i = 0; i < arr.length; i++) {
　　　　　　arr[i] = arr[i].split("=");
　　　　　　obj[arr[i][0]] = arr[i][1];
　　　　};
　　　　delete obj[name];
  　　  var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
  　　　　return url
  　　};
  },

  /**
   * 广告曝光
   */
  send: function (params) {
    for (var i = 0; i< params.length; i++) {
      var adImg = document.createElement('img')
      adImg.src = params[i];
      adImg.style.display = 'none';
      document.body.append(adImg)
    }
  },

  /**
   * 获取范围随机数
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * 获取时间之前
   * @param {*} param
   */
  getTimeAgo: function(param) {
    var times = ['刚刚'];
    for (var index = 1; index < 60; index++) {
      times.push(index + '分钟前');
    }
    return times[Ad.random(0, 59)];
  },

    /**
   * 判断元素是否在可视区
   * 用于广告曝光率
   */
  isElementInViewport: function(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top <= windowHeight && rect.top + rect.height >= 0;
  },

  /**
   * 监测曝光率
   * div 广告dom
   * monitorUrl 广告曝光接口
   */
  checkMonitor: function(div, monitorUrl) {
    var isInViewport = vc.isElementInViewport(div);
    if (isInViewport) {
      vc.send(monitorUrl)
    }

    var checkFun = vc.throttle(function() {
      if (vc.isElementInViewport(div)) {
        window.removeEventListener('scroll', checkFun, true);
        vc.send(monitorUrl)
      }
    }, 200);

    window.addEventListener('scroll', checkFun, true);
  },

  /**
   * 节流
   */
  throttle: function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行func函数
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },

  /**
   * 广告被点击时
   * clickUrl 点击率接口
   * dUrl 广告落地页url
   */
  adClick: function(clickUrl, dUrl) {
    console.log('click')
    vc.send(clickUrl)

    if (dUrl) {
      setTimeout(function() {
        var a = document.createElement('a');
        a.href = dUrl[0];
        a.rel = 'noreferrer';
        document.body.appendChild(a);
        a.click();

      }, 10);
    }
  },

  /**
   * 监听页面滚动高度
   */
  viewScroll: function () {
    window.onscroll = function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var videoHeight = ($('#video-dom').height() / 2);
      if (scrollTop >= videoHeight) {
        $('.arrow-down').hide()
      }
    }
  },

  /**
   * 按压接口
   */
  pressApi: function (pressDate) {
    $.ajax({
      url: BASE.user_api + '/nol_stat',
      type: 'POST',
      data: {
        data: pressDate,
        code: code,
        brower_id: brower_id,
        ua: navigator.userAgent,
        user_id: user_id,
        video_id: video_id,
        system: system
      },
      success: function () {}
    })
  },
  /**
   * 组装按压数据
   */
  pushForceDate: function () {
    var arrLen = vc.forceArray.length;
    var pressLen = vc.pressArr.length;
    if (arrLen >= 3) {
      var newArr = vc.forceArray.slice(0, 3);
      if (pressLen < 2) {
        (vc.pressArr).push(newArr);
        if (pressLen == 1) {
          vc.pressApi(JSON.stringify(vc.pressArr))
        }
      }
    }
  },

  /**
   * 点击启动量
   */
  qdlClick: function (url) {
    top.location.href = url;
  }
}
