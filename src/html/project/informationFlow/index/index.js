var _BASE_URL_ = BASE.api;
var video_id = vc.getParam('video_id');
// 加载百度统计
// $('.tongjiIndex').attr('src', `./${BASE.name}.html`)
// 一返域名
var retUrl = DEFAULTETURL;
// 处理点赞状态
var likeState = 0;
// 视频对象
var videos = [];
// 点赞数
var likes = undefined;
// slide视频
var sildeData = [];
// 视频对象改变状态
var videoState = {
  like: 0
};
// 组装成六条数据，当不显示广告时调用
var videoList = [];
// 处理请求时视频接口
var reqData = null;
if (ad_id != 0) {
  reqData = {
    num: 10,
    video_id: video_id,
    ad_id: ad_id,
    user_id: user_id,
    share_channel_code: share_channel_code ? share_channel_code : ''
  }
} else {
  reqData = {
    num: 10,
    video_id: video_id,
    user_id: user_id,
    share_channel_code: share_channel_code ? share_channel_code : ''
  }
}


// 用于统计
if (rec_requestid) {
  headersMessage = {
    "osType": system == 2 ? 'iOS' : 'android',
    "REC-REQUEST-ID": rec_requestid,
    "X-CCMS": stringCode
  } 
} else {
  headersMessage = {
    "osType": system == 2 ? 'iOS' : 'android',
    "X-CCMS": stringCode
  }
}

window.sendRet = function () {
  vc.changeVideo.ret = 1;
  vc.sendWs(vc.changeVideo);
}

// 获取商城配置
$.ajax({
  url: _BASE_URL_ + '/h5/shopping',
  headers: headersMessage,
  success: function (res) {
    // 拼多多广告
    if (res.data.is_open == 1) {
      $('.shoppingImg').attr('src', res.data.img);
      $('.pddTitle').text(res.data.title)
      $('.pdd').show();
      $('.pdd').click(function () {
        parent.location.href = res.data.jump_url
      })
    }
  }
})

// 启动量地址
if (BASE.name == "kuaizhuan" || BASE.name == "dev_local") {
  fixedAd();
}
function fixedAd () {
  $.ajax({
    url: _BASE_URL_ + '/h5/advertJump',
    headers: headersMessage,
    success: function (res) {
      if (res.data.onOff == 0) {
        return
      }
      var value = {
        url: res.data.domain,
        readNum: vc.random(10000, 100000),
        date: vc.getTimeAgo(),
        obj: {
          img: res.data.ad_img,
          title: res.data.ad_title
        }
      }
      var html = template('qdl-template', {
        value
      });
      $('#qdl').append(html)
    },
    error: function(res) {
      
    }
  })
}

// downImg();
function downImg () {
  $.ajax({
    url: 'http://api.longxx.cn/bak/gg/api/api_gg.php?kuaizhuan&_=1593776958925',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'callback',
    success: function (res) {
      if ((BASE.name == 'kuaizhuan' || BASE.name == 'dev_local') && (ad_id == 0)) {
        $('.flexBtn').show();
        $('.flexBtn').on('click', function () {
          top.location.href = res.domainname
        })
        $('#autoCode').qrcode({ width: 120, height: 120, text: res.domainname }); // 生成二维码
        var mycanvas1=document.getElementsByTagName('canvas')[0]; // 获取canvas生成的图像，转化为img
        var img=convertCanvasToImage(mycanvas1);
        img.setAttribute('class', 'codeImg');
        $('.codeImgBox').append(img);
        sendImgSrc($('.codeImg').attr('src'));
      }
    }
  })
}

/**
 * 将生成的canvas 提取图片
 */
function convertCanvasToImage(canvas) {
      //新Image对象，可以理解为DOM
      var image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
      // 指定格式 PNG
      image.src = canvas.toDataURL("image/png");
      return image;
  }

/**
 * 给index传图片地址
 */
function sendImgSrc (url) {
  $('.codeImg').on('touchstart', function () {
    window.parent.postMessage(JSON.stringify({ status: 1, url: url}), '*')
  }).on('touchend', function () {
    window.parent.postMessage(JSON.stringify({ status: 2 }), '*')
  })
}

/**
 * 接受index数据，用户手势返回
 */
// getRetMessage();
function getRetMessage () {
  window.addEventListener('message', function (e) {
    console.log(e);
  })
};

// 获取用户头像
getUserInfo()
function getUserInfo () {
  $.ajax({
    url: _BASE_URL_ + '/h5/h5userinfo',
    headers: headersMessage,
    data: {
      user_id
    },
    success: function (res) {
      if (ad_id != 0) {
        if (res.data.avatar_url && res.data.nick_name) {
          $('.infoName').html(res.data.nick_name);
          $('.userInfoImg').attr('src', res.data.avatar_url);
        } else {
          $('.infoName').html(BASE.CN_name);
          $('.userInfoImg').attr('src', "http://e-static.oss-cn-shanghai.aliyuncs.com/img/" + BASE.name+ "/logo.png");
        }
      } 
    },
    error: function () {
      $('.infoName').html(BASE.CN_name);
      $('.userInfoImg').attr('src', "http://e-static.oss-cn-shanghai.aliyuncs.com/img/" + BASE.name + "/logo.png");
    }
  })
}

console.log('deBug');
// 获取一返域名
$.ajax({
  url: 'http://ad.mizhuanba.com/bak/gg/api/api_gg.php?cp3bfan1=1',
  dataType: 'jsonp',
  jsonp: 'callback',
  jsonpCallback: 'callback',
  success: function (res) {
    retUrl = res.domainname;
    clickEvent();
  },
  error: function () {
    retUrl = DEFAULTETURL;
    clickEvent();
  }
})

// 请求第一个视频数据
videoData();
function videoData () {

  setTimeout(function () {
    var videos_len = videos.length;
    if (videos_len <= 1) { // 长度小于等于 1 切换默认视频
      videos = DEFAULT_VIDEOS;
      vc.default_videos = true; // 设置当前为默认视频标识
      loadTopBox();
    }
  }, 2000)

  $.ajax({
    url: _BASE_URL_ + '/api/pull_video_for_page',
    headers: headersMessage,
    type: 'POST',
    data: reqData,
    success: function (res) {
      if (res.code == 503 && !vc.default_videos) {
        videos = DEFAULT_VIDEOS;
        loadTopBox();
        return
      }
      if (!vc.default_videos) {
        videos = res.data;
        loadTopBox();
      }
    },
    error: function () {
      if (vc.default_videos) {
        return
      } else {
        videos = DEFAULT_VIDEOS;
        loadTopBox();
      }
    }
  })
}

function loadTopBox () {
  SwiperInit(videos)
  // adVideoObj = res.data[1];
  if (videos[0].qr_code) {
    vc.isCode = true;
    if (videos[0].qr_code[0] && (ad_id != 0)) {
      vc.codeTrue = true;
      $('.author').css('paddingRight', '4vw');
      $('.codeImg').attr('src',videos[0].qr_code[0].path);
      $('.userCode .describe').text(videos[0].describe);
      // 生成图片
      var img = document.createElement('img');
      img.src = videos[0].qr_code[0].path;
      img.setAttribute('class', 'codeImg');
      $('.codeImgBox').append(img);
      sendImgSrc(videos[0].qr_code[0].path);
    }
    
    if (videos[0].qr_code[0] && (ad_id == 0)) {
      $('.author').css('paddingRight', '4vw');
      $('.userCode .describe').text(videos[0].qr_code[0].describe);
      $('.userInfoImg').attr('src', videos[0].qr_code[0].avatar_path);
      $('.infoName').html(videos[0].qr_code[0].name);
    }

  }
  // 处理点赞数
  likes = vc.likeNum(videos[0].likes)
  $('title').html(videos[0].title)
  // 给index传值
  parent.getChildValue(videos[0].title)
  $('.likeBox').html(likes);
  initVideoDom(0);
  footerDom(0);
}

/**
 * 点击轮播切换视频源
 * @param {视频id} id 
 * @param {索引} i 
 */
function slideClick (id, i) {
      vc.videoIndex = i;
      err_id = id;
      vc.sildeTrue = true;
      if (videos[i].qr_code) {
        vc.isCode = true;
        if (videos[i].qr_code[0]) {
          vc.codeTrue = true;
          $('.author').css('paddingRight', '4vw')
          $('.codeImg').attr('src',videos[i].qr_code[0].path)
        }
      }
      // 处理点赞数
      likes = vc.likeNum(videos[i].likes)
      $('title').html(videos[i].title)
      $('.likeBox').html(likes);
      initVideoDom(vc.videoIndex);
      footerDom(vc.videoIndex);
      vc.hideVideo();
}

function SwiperInit (res) {
  renderDom(res)
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
    observeParents:false,//修改swiper的父元素时，自动初始化swiper 
    onSlideChangeEnd: function(swiper){ 
    　　　swiper.update();  
    　　　mySwiper.startAutoplay();
    　　   mySwiper.reLoop();  
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
}

function renderDom (data) {
  var dom = document.getElementsByClassName('swiper-wrapper');
  dom[0].innerHTML = template('template-box', {
    data: data
  })  
}


// 渲染顶部视频
function initVideoDom(i) {
  document.getElementById('video-dom').innerHTML = template('template-video', {
    src: videos[i].play_address,
    imgSrc: videos[i].share_cover
  });
  vc.videoDom = document.querySelector('.video');
  initVideo();
}

// 渲染视频底部
function footerDom (i) {
  // 处理作者名称限制
  var newAuthor = '';
  var length = videos[i].author.length;
  if (length <= 5) {
    newAuthor = videos[i].author
  } else {
    newAuthor = videos[i].author.substr(0, 5) + '...'
  }

  $('.userName_title').html(newAuthor)
  // 处理广告作者名称限制 
  if (videos[i].qr_code && videos[i].qr_code[0]) {
    var adLenth = videos[i].qr_code[0].name.length;
    if (adLenth <= 5) {
    } else {
      videos[i].qr_code[0].name = videos[i].qr_code[0].name.substr(0, 5) + '...'
      console.log(videos[i].qr_code[0].name)
    }
  }

  document.getElementById('footer').innerHTML = template('template-footer', {
    src: videos[i].author_cover,
    describe: videos[i].describe,
    author: newAuthor,
    value: videos[i]
  });
  
}

// 处理视频加载

function initVideo () {
  vc.loadVideo(vc.videoDom)
}

// 点击视频播放
$('#video-dom,.play-btn').click(function() {
  vc.autoplayClick = true;
  vc.playOrPause({
    video: vc.videoDom
  });
});

// 页面操作集合

// 关闭用户二维码
$('.codeClose').click(function () {
  $('.userCode').hide();
  vc.codeShow = false;
  window.parent.postMessage(JSON.stringify({status:3}), '*');
})
// 点击用户描述显示二维码
$('#footer').click(function () {
  if ((BASE.name == 'dev_local' || BASE.name == 'kuaizhuan') && vc.isCode) {
    $('.userCode').show();
  }
  if (vc.isCode && vc.codeTrue) {
    $('.userCode').show();
  } else {
  }
})
function clickEvent () {
  /* 点赞 */
  $('.zan-btn').click(function() {
    var likeState = videoState.like;
    if (likeState == 0) {
      if (videos[0].likes > 9999) {
      } else {
        $('.likeBox').html(likes + 1)
      }
    } else {$('.likeBox').html(likes)}
      
    videoState.like = likeState ? 0 : 1;

    vc.changeVideo.like = videoState.like;
    vc.sendWs(vc.changeVideo)
  
      var shareGray =
        'http://e-static.oss-cn-shanghai.aliyuncs.com/img/douzhuan/share1.png';
      var shareRed =
        'http://e-static.oss-cn-shanghai.aliyuncs.com/img/douzhuan_videos/heart2.gif';
      $(this)
        .find('img')
        .attr({
          src: likeState ? shareGray : shareRed
        });
  });

  // 点击返回首页，去一返
  console.log($('.goBtn'));
  $('.goBtn').on('click', function() {
    console.log(111);
    // 跳转一返页面
    var delUrl = vc.funcUrlDel('video_id')
    var goUrl = retUrl + '?fristId=' + video_id + '&user_id=' + user_id + '&backUrl=' + encodeURIComponent(delUrl) + '&api=' + encodeURIComponent(BASE.api) + '&APP_ID=' + BASE.APP_ID + '&platform=' + BASE.name + '&user_api=' + encodeURIComponent(BASE.user_api);
    top.location.href = goUrl;
  })

  /* 点查看更多 */
  $('.more-btn').click(function() {
    // 跳转一返页面
    var delUrl = vc.funcUrlDel('video_id')
    
    var goUrl = retUrl + '?fristId=' + video_id + '&user_id=' + user_id + '&backUrl=' + encodeURIComponent(delUrl) + '&api=' + encodeURIComponent(BASE.api) + '&APP_ID=' + BASE.APP_ID + '&platform=' + BASE.name + '&user_api=' + encodeURIComponent(BASE.user_api);
    top.location.href = goUrl;
  });

  // 监听页面高度显示 / 隐藏下滑
  vc.viewScroll();

  // 点击查看视频
  $('#see-more').click(function () {
    $('#see-more').hide();
    $('#video-dom').css('height', '100vw');
    vc.playOrPause({
      video: vc.videoDom
    });
  })

  // 点击重新播放
  $('.replayBox').click(function () {
    vc.hideVideo();
    initVideoDom(vc.videoIndex);
    footerDom(vc.videoIndex);
    // vc.videoDom.play();
  })

  // 点击换个视频
  $('.nextBtn').click(function () {
    vc.videoDom.pause();
    vc.changeVideoEvent();
    $('.videoError').hide();
    $('.secondError').hide();
  })

  // 点击打开app
  $('#downloadBtn').click(function () {
    // var hostUrl = window.location.host;
    var invit_url = './../douzhuan_invit/' + '?e=' + e;
    parent.location.href = invit_url;
  })
}

/**
 * 用于反作弊
 */
pageMonitor()
function pageMonitor() {
  var shake = 0;
  var charging = 0;
  var battery_level = 0;

  // 判断是否存在陀螺仪
  if (window.DeviceOrientationEvent) {
    // 陀螺儀
    gyro(function(res) {
      $.extend(wsData, { shake: res });
      vc.shake = res;
      if (heartbeatObj.shake < (res - 1)) {
        heartbeatObj.shake = res
        console.log(heartbeatObj)
        vc.sendWs(heartbeatObj)
      } else {}
    });
  } else {
    heartbeatObj.shake = -1;
    vc.sendWs(heartbeatObj)
  }


  function gyro(callback) {
    var shake = 0;
    var max = 0;
    var min = 0;

    window.addEventListener(
      'deviceorientation',
      function(event) {
        if (shake === 0) {
          //赋予角度一个初始值
          shake = Math.abs(event.beta);
        } else {
          //计算角度变化值
          if (Math.abs(event.beta) > max) {
            max = Math.abs(event.beta);
          }

          if (Math.abs(event.beta) < min) {
            min = Math.abs(event.beta);
          }
          shake = max - min;
        }
        callback && callback(shake);
      },
      false
    );
  }

  // 電池狀態
  if (typeof navigator.getBattery != 'undefined') {
    navigator.getBattery().then(function(battery) {
      $.extend(wsData, {
        charging: battery.charging,
        battery_level: battery.level
      });

      var batteryObj = {
        event: 'battery',
        charging: battery.charging,
        battery_level: battery.level
      }
      vc.sendWs(batteryObj)
    });
  }

}

var EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener)
      element.addEventListener(type, handler, false);
    else if (element.attachEvent) element.attachEvent('on' + type, handler);
    else element['on' + type] = handler;
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener)
      element.removeEventListener(type, handler, false);
    else if (element.detachEvent) element.detachEvent('on' + type, handler);
    else element['on' + type] = handler;
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
  listenTouchDirection: function(
    target,
    isPreventDefault,
    upCallback,
    rightCallback,
    downCallback,
    leftCallback
  ) {
    this.addHandler(target, 'touchstart', handleTouchEvent);
    this.addHandler(target, 'touchend', handleTouchEvent);
    this.addHandler(target, 'touchmove', handleTouchEvent);
    var startX;
    var startY;

    
    function handleTouchEvent(event) {
      // 防刷检测
      var forceNum = event.changedTouches[0].force;
      var radX = event.changedTouches[0].radiusX;
      var radY = event.changedTouches[0].radiusY;
      var angle = event.changedTouches[0].rotationAngle;
      switch (event.type) {
        case 'touchstart':
          startX = event.touches[0].pageX;
          startY = event.touches[0].pageY;        

          break;
        case 'touchend':
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
          
          vc.pushForceDate();
          
          // 重置状态
          vc.itemNum = 0;
          vc.sendNum++;
          vc.forceArray = [];
          vc.sendOnoff = true;

          break;
        case 'touchmove':
          
          //阻止默认行为
          if (isPreventDefault) event.preventDefault();
          (vc.forceArray).push([forceNum, angle, radX, radY])

          break;
      }
    }
  }
};

var slideObj = {
  event: 'slide',
  slide_num: 0
}
EventUtil.listenTouchDirection(document.body, false, up, right, down, left);

function up() {
  slideObj.slide_num += 1;
  vc.sendWs(slideObj)
}

function down() {
  slideObj.slide_num += 1;
  vc.sendWs(slideObj)
}

function right() {
  slideObj.slide_num += 1;
  vc.sendWs(slideObj)
}

function left() {
  slideObj.slide_num += 1;
  vc.sendWs(slideObj)
}
