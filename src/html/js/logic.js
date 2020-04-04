/*
 * @Author: chenlong
 * @Date: 2019-04-03 14:52:09
 * @Last Modified by: chenlong
 * @Last Modified time: 2019-04-07 19:49:13
 */
(function() {
  var shareCount = 0; //分享次数
  //配置title
  fns.setTitle(Config.title);

  /* 落地一初始化 */
  if (util.goal_data.type == '1') {
    initGoal1();
  }

  /* 落地二初始化 */
  if (util.goal_data.type == '2') {
    initGoal2();
  }

  //落地一初始化
  function initGoal1() {
    $('#video-img-box').hide();
    /* 广告信息 */
    $('#ad').css({
      backgroundImage: ''
    });

    //加载视频
    fns.createScript(
      'https://xx1img.oss-cn-beijing.aliyuncs.com/js/tvp.player_v2_zepto.js',
      function() {
        var video = new tvp.VideoInfo();
        var player = new tvp.Player();

        video.setVid(video_info.vid);

        //jump=1表示从落地二跳至落地一 即从jump_time开始播放
        if (jump == 1) {
          video.setTagStart(video_info.jump_time);
        }

        player.create({
          width: '100vw',
          height: '50vh',
          video: video,
          modId: 'mod_player',
          autoplay: true,
          onallended: function() {
            //播放完成跳转至广告
            window.location.href = ad_url;
          },
          ontimeupdate: function() {
            //播放中
            ontimeupdate(player);
          }
        });
      }
    );
  }

  //落地二初始化
  function initGoal2() {
    //显示伪视频
    $('#video-img-box').show();
    $('#video-img').attr({
      src: video_info.cover_pic
    });

    //显示分享
    $('#share-wrap')
      .show()
      .css({
        backgroundImage: ''
      });

    //加载微信js
    fns.createScript(
      'http://res.wx.qq.com/open/js/jweixin-1.4.0.js',
      function() {
        //xwconfig
        wx.config(Object.assign(sdk_config, { debug: false }));
        wx.ready(() => {
          //要隐藏的菜单项
          wx.hideMenuItems({
            // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            menuList: menuList || [
              'menuItem:share:appMessage', //朋友
              'menuItem:share:timeline', //朋友圈
              'menuItem:share:qq', //qq
              'menuItem:share:weiboApp', //微博
              'menuItem:favorite', //收藏
              'menuItem:share:facebook', //Facebook
              'menuItem:share:QZone', //QQ空间
              'menuItem:editTag', //编辑标签
              'menuItem:delete', //删除
              'menuItem:copyUrl', //复制链接
              'menuItem:originPage', //原网页
              'menuItem:readMode', //阅读模式
              'menuItem:openWithQQBrowser', //qq浏览器打开
              'menuItem:openWithSafari', //Safari
              'menuItem:share:email', //邮件
              'menuItem:share:brand' //一些特殊公众号
            ]
          });
          callback && callback();
        });
      }
    );
  }

  /* 监听播放进度 */
  function ontimeupdate(player) {
    //jump==1 表示来自落地二 则继续播放
    if (jump == 1) return;

    var curTime = player.getPlaytime();
    if (curTime >= video_info.jump_time) {
      var a = document.createElement('a');
      a.rel = 'noreferrer';
      a.href = goal2_url;
      a.click();
    }
  }
})();
