/* 监听用户行为 */
var data = {
  page: 3, //1:文章落地页 2：视频落地 3：一反
  click_num: 0,
  slide_num: 0,
  shake: 0,
  charging: 0,
  battery_level: 0,
  more_click: 0
};

var articles = [];
function getParam(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

// 请求广告pid
function reqPid () {
  $.ajax({
    url: _BASE_URL_ + '/h5/advert_shiping',
    headers: headersMessage,
    type: 'GET',
    data: {},
    success: function (res) {
      if (res.code == 503) {
        AD_DATA = DEFAULT_AD_DATA
        loadAds();
        return
      }
      AD_DATA = res.data
      loadAds();
    },
    error: function () {
      AD_DATA = DEFAULT_AD_DATA;
      loadAds();
    }
  })
}

var backUrl = getParam('backUrl');

var fristId = getParam('fristId');

document.addEventListener('DOMContentLoaded', function() {

  /* 初始化竞价广告 */
  adSwitch == 1 ? initAds() : renderVideo();
  
  /* 初始化页面事件等杂项 */
  initLogic();
});

/**
 * 初始化竞价广告
 */
function initAds() {
  Ad.loadJs(
    'http://e-static.oss-cn-shanghai.aliyuncs.com/js/art-template.js',
    function() {
      reqPid();
      setTimeout(function () {
        var length = AD_DATA.length;
        if (length <= 1) {
          AD_DATA = DEFAULT_AD_DATA;
          loadAds();
        }
      }, 2000)
    }
  );
}

/**
 * 渲染视频
 */
function renderVideo() {
  setTimeout(function () {
    var videos_len = videoList.length;
    if (videos_len <= 1) { // 长度小于等于 1 切换默认视频
      videoList = DEFAULT_VIDEOS.slice(1, 7);
      vc.default_videos = true; // 设置当前为默认视频标识
      // 点击推荐视频时，改变adSwitch状态
      var newUrl = vc.funcUrlDel('showAd');
      Ad.loadJs(
        'http://e-static.oss-cn-shanghai.aliyuncs.com/js/art-template.js',
        function() {
          videoList.forEach(function(item) {
            var newhref = Ad.subUrlParam(newUrl, 'video_id', item.id) + '&showAd=1'
            console.log(newhref)
            item.href = `${newhref}`;
            item.date = Ad.getTimeAgo(); //日期
            item.readNum = Ad.random(10000, 100000)
          });
          var html = template('ad-template-single-article', {
            videoList
          });
          $('#ad-list').html(html);
        }
      );
    }
  }, 2000)

  $.ajax({
    url: _BASE_URL_ + '/api/pull_video_for_page',
    headers: headersMessage,
    type: 'POST',
    data: reqData,
    success: function (res) {
      if (res.code == 503) {
        videoList = DEFAULT_VIDEOS.slice(1, 7);
      } else {
        videoList = res.data.slice(1, 7);
      }
      // 点击推荐视频时，改变adSwitch状态
      var newUrl = vc.funcUrlDel('showAd')
      Ad.loadJs(
        'http://e-static.oss-cn-shanghai.aliyuncs.com/js/art-template.js',
        function() {
          videoList.forEach(function(item) {
            var newhref = Ad.subUrlParam(newUrl, 'video_id', item.id) + '&showAd=1'
            console.log(newhref)
            item.href = `${newhref}`;
            item.date = Ad.getTimeAgo(); //日期
            item.readNum = Ad.random(10000, 100000)
          });
          var html = template('ad-template-single-article', {
            videoList
          });
          $('#ad-list').html(html);
        }
      );
    },
    error: function () {
      videoList = DEFAULT_VIDEOS.slice(1, 7);
      // 点击推荐视频时，改变adSwitch状态
      var newUrl = vc.funcUrlDel('showAd')
      Ad.loadJs(
        'http://e-static.oss-cn-shanghai.aliyuncs.com/js/art-template.js',
        function() {
          videoList.forEach(function(item) {
            var newhref = Ad.subUrlParam(newUrl, 'video_id', item.id) + '&showAd=1'
            console.log(newhref)
            item.href = `${newhref}`;
            item.date = Ad.getTimeAgo(); //日期
            item.readNum = Ad.random(10000, 100000)
          });
          var html = template('ad-template-single-article', {
            videoList
          });
          $('#ad-list').html(html);
        }
      );
    }
  })
}

/**
 * 渲染广告
 */
function loadAds() {
  // 创建事件实例

  var adListIndex = 0; // 广告索引
  
  var deny_cids = []; // 屏蔽广告主ID 数组

  var adData = Ad.transformAdData(); // 把广告类型的list数据，组装成渲染所需要的数据类型

  function recursive() {
    if (adData.length === 0) return;
    var currAd = adData[adListIndex];

    Ad.singleAd(
      $.extend(currAd, {
        data: {
          app_id: APP_ID,
          deny_cids: deny_cids.join(',')
        }
      }),
      function(res) {
        if (adListIndex === adData.length - 1) {
          return;
        }

        if (res) {
          /* 当前广告请求完毕后 将广告的cid(创意id)插入 deny_cids 用于防止广告重复 */
          deny_cids.push(res.cid); //插入创意id 用于广告位被重复广告占用
          // ader_ids.push(res.ader_id); //插入广告主id
        }

        adListIndex++;
        /* 请求下个广告 */
        recursive();
      }
    );
  }

  // 触发广告请求
  recursive();
}

/**
 * 页面零散逻辑初始化 包含 事件等
 */
function initLogic() {
  Ad.clickCallback = function(pid) {
    $.extend(data, { type: 'ad_click', pid: pid });
  };
}

/**
 * 渲染文章
 * @param {*} index
 */
function renderArticle(data) {
  var html = template('ad-template-single-article', data);
  $('#ad-list').append(html);
}


