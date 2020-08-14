var _BASE_URL_ = BASE.api;
var APP_ID = BASE.APP_ID;
var AD_DATA = [];

// type:1 单图  2三图 3大单图

/* 图片站位 */
$('#article-content img').attr({
  src:
    'http://e-static.oss-cn-shanghai.aliyuncs.com/img/mz/placeholader.png'
});
// 广告templateId、adWrapClass, key对应广告数据中的type字段
var AD_TYPE = {
  /* 单图信息流 */
  '1': {
    templateId: 'ad-template-single', // 模板id
    adWrapClass: 'ad-wrap-single' // 广告dom className
  },
  /* 3图信息流 */
  '2': {
    templateId: 'ad-template-3img',
    adWrapClass: 'ad-wrap-3img'
  },
  /* 单大图信息流 */
  '3': {
    templateId: 'ad-template-single-big',
    adWrapClass: 'ad-wrap-single-big'
  },
  /* 悬浮 */
  '4': {
    templateId: 'ad-template-float',
    adWrapClass: 'ad-wrap-float'
  },
  /* 文字链 */
  '5': {
    templateId: 'ad-template-textlink',
    adWrapClass: 'ad-wrap-textlink'
  },
  /* 文字链(含阅读数) */
  '6': {
    templateId: 'ad-template-textlink-readnum',
    adWrapClass: 'ad-wrap-textlink-readnum'
  }
};

// 广告所在位置 key对应AD_DATA中的position字段
var AD_POSITION = {
  '1': 'ad-list' /* 广告要插入的dom id 广告列表(精彩推荐) */,
  '2': 'jj-ad-float-top' /* 顶部悬浮 */,
  '3': 'jj-ad-float-bottom' /* 顶部悬浮 */,
  '4': 'jj-ad-title' /* 标题下方 */,
  '5': 'jj-ad-article-after' /* 文末 */,
  '6': null /* 文中广告 比较特殊 需要在singleAd的callback中单独处理*/
};

/**
 * Ad对象 仅用于竞价广告
 */
var Ad = {
  /* 点击广告触发该方法 */
  clickCallback: function() {},

  /**
   * 获取除文中广告的其他所有广告
   * 将 AD_DATA、AD_TYPE、AD_POSITION 转成 Ad.singleAd 方法所需要的数据格式
   * @returns
   */
  transformAdData: function() {
    return (AD_DATA || []).map(function(item) {
      return {
        pid: item.pid,
        templateId: AD_TYPE[String(item.type)].templateId, //模板script的id
        adWrapClass: AD_TYPE[String(item.type)].adWrapClass, //广告wrap的class 用于寻找被插入的广告
        wrapDomId: AD_POSITION[String(item.position)] //插入广告模板的父级id
      };
    });
  },

  /**
   * 加载js
   * @param {*} url
   * @param {*} callback
   */
  loadJs: function(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = function() {
      callback && callback();
    };
    document.body.appendChild(script);
  },
  /**
   * 请求广告数据
   * data 要传的数据 默认已经穿了ua 这里一般只传pid即可
   * callback 获取数据回调 callback(err,res)
   * 注意：此方法只获取数据，渲染方法需与该方法解耦
   */
  fetchAd: function(data, callback, complete) {
    var ua = navigator.userAgent;
    var data = data || {};

    $.ajax({
      type: 'get',
      headers: {
        'User-Agent': ua
      },
      url: 'http://ssp.1rtb.com/client/req_ad',
      data: $.extend(
        {
          device_ua: ua,
          type: 'api'
        },
        data
      ),
      dataType: 'jsonp', //jsonp格式访问
      success: function(res) {
        callback && callback(null, res);
      },
      error: function(err) {
        callback && callback(err);
      },
      complete: function() {
        complete && complete();
      }
    });
  },

  /**
   * 广告被点击时
   * clickUrl 点击率接口
   * dUrl 广告落地页url
   */
  adClick: function(clickUrl, dUrl, pid, type) {
    Ad.clickCallback(pid);
    clickUrl.forEach(function(url) {
      Ad.send(url);
    });

    var adClickObj = {
      event: 'adClick',
      pid: pid
    }
    vc.sendWs(adClickObj);
    console.log(user_id, type, video_id, pid, navigator.userAgent)

    // 用户价值
    var api = BASE.user_api;
    $.ajax({
      url: api + '/adClickStat',
      type: 'POST',
      data: {
        user_id: user_id,
        type: type,
        video_id: video_id,
        pid: pid,
        page: 1,
        ua: navigator.userAgent,
        sign: 'bFwbxLAzwd5F4DOPS2hO'
      },
      success: function () {}
    })


    if (dUrl) {
      setTimeout(function() {
        // var a = document.createElement('a');
        // a.href = dUrl[0];
        // a.rel = 'noreferrer';
        // document.body.appendChild(a);
        // a.click();
        // location.href = dUrl[0];
        top.location.href = dUrl[0]
      }, 100);
    }
  },

  /**
   * 点击推荐视频
   */
  clickVideo: function (url) {
    parent.location.href = url;
  },

  /**
   * 获取年月日
   */
  getDate: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;
    return year + '-' + month + '-' + strDate;
  },

  /**
   * 获取范围随机数
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
    var isInViewport = Ad.isElementInViewport(div);
    if (isInViewport) {
      monitorUrl.forEach(function(url) {
        Ad.send(url);
      });
      return;
    }

    var checkFun = Ad.throttle(function() {
      if (Ad.isElementInViewport(div)) {
        window.removeEventListener('scroll', checkFun, true);
        monitorUrl.forEach(function(url) {
          Ad.send(url);
        });
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
   * 发送请求
   */
  send: function(url) {
    var img = document.createElement('img');
    img.src = url;
    img.style.display = 'none';
    document.body.appendChild(img);
  },

  /**
   * 获取头像
   * @returns
   */
  getHeadImgs: function() {
    var imgRootUrl = 'http://e-static.oss-cn-shanghai.aliyuncs.com/img/hds/';
    var headerImgs = [];
    for (var i = 1; i < 21; i++) {
      headerImgs.push(imgRootUrl + i + '.jpg');
    }
    return headerImgs;
  },

  /**
   * pid 广告位id
   * templateId 模板script的id
   * wrapDomId 插入广告模板的父级id
   * adWrapClass 广告wrap的class 用于寻找被插入的广告
   * data 拓展的数据                                          
   * insertFn 用于插入广告并返回结果
   * @param {*} params
   */
  singleAd: function(params, callback, insertFn) {
      var pid = params.pid,
      templateId = params.templateId,
      wrapDomId = params.wrapDomId,
      adWrapClass = params.adWrapClass,
      data = params.data || {};

    // 获取头像
    var headerImgs = Ad.getHeadImgs();
    // console.log(params);

    // console.log(headerImgs);

    Ad.fetchAd($.extend({ pid: pid }, data), function(err, res) {
      if (!err) {
        var viewHeadImgs = [];
        for (var i = 0; i < 3; i++) {
          viewHeadImgs.push(headerImgs[Ad.random(0, headerImgs.length)]);
        }

        //获取模板生成的html
        var html = template(
          templateId,
          $.extend(res, {
            viewNum: Ad.random(50, 100),
            viewHeadImgs: viewHeadImgs,
            date: Ad.getTimeAgo(), //日期
            readNum: Ad.random(10000, 100000) //阅读数
          })
        );

        var adDom = null;

        if (insertFn && typeof insertFn === 'function' && wrapDomId === null) {
          // 处理文中广告
          adDom = insertFn(html, params);
        } else {
          // 处理其他广告
          //插入模板生成的html
          $('#' + wrapDomId).append(html);
          // 查询被插入的广告 用于曝光监测
          adDom = $('#' + wrapDomId + ' .' + adWrapClass).last()[0];
        }

        //启动广告曝光监测
        adDom && Ad.checkMonitor(adDom, res.monitorUrl);
      }

      callback && callback(res);
    });
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

  // 替换地址栏参数
  subUrlParam: function (oUrl, paramName, replaceWith) {
    var re = new RegExp('(' + paramName + '=)([^&]*)', 'gi')
    var nUrl = oUrl.replace(re, paramName + '=' + replaceWith)
    return nUrl
 }
};
