/*
 * @Author: chenlong
 * @Date: 2019-04-03 14:52:09
 * @Last Modified by: chenlong
 * @Last Modified time: 2019-04-11 19:09:22
 */

var shareCount = 0; //分享次数
var province = '本省';
var city = '本地';

//配置title
fns.setTitle(Config.title);

/* 落地二初始化 */
initGoal2();

//落地二初始化
function initGoal2() {
    $('body').css({
        backgroundImage: 'url(' + share_rule[0].notice_pic + ')'
    });

    //省市
    fns.createScript('https://ip.ws.126.net/ipquery', function () {
        province = lo;
        city = lc.replace("市", '');
    });

    //notice_pic预加载
    fns.imagePreload(
        share_rule.map(function (i) {
            return i.notice_pic;
        })
    );

    //加载微信js
    fns.createScript('http://res.wx.qq.com/open/js/jweixin-1.4.0.js', function () {
        //xwconfig
        wx.config(Object.assign(sdk_config));
        wx.ready(function () {
            //分享
            shareHandle();
        });
    });
}

//分享
function shareHandle() {
    var currRule = share_rule[shareCount];

    //要隐藏的菜单项
    fns.hideMenuItems();

    /* 1:群 2:朋友圈 */
    wx.showMenuItems({
        menuList:
            currRule.share_type == 1
                ? ['menuItem:share:appMessage']
                : ['menuItem:share:timeline']
    });

    fns.share({
        title:
            currRule.share_title == null
                ? ' '
                : currRule.share_title.replace('__dizhi__', city),

        link: currRule.share_url,
        imgUrl: currRule.share_icon,
        desc: currRule.share_desc.replace('__dizhi__', city),
        type: 'video',
        success: function () {
            shareCount += 1;
            TJ.share(shareCount);
            //tj_tj(shareCount);
            if (shareCount == share_rule.length) {
                fns.go(goal1_url); //跳转至落地一
                return;
            }
            //更新分享图片
            $('body').css({
                backgroundImage: 'url(' + share_rule[shareCount].notice_pic + ')'
            });
            //调用自己
            shareHandle();
        }
    });
}
