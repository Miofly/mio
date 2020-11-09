
// 兼容移动端多次触发事件
// var isLoading = false;
// window.onscroll = function() {
//   var t = document.documentElement.scrollTop || document.body.scrollTop;
//   var h =
//     window.innnerHeight ||
//     document.documentElement.clientHeight ||
//     document.body.clientHeight;
//   if (t >= document.documentElement.scrollHeight - h && isLoading == false) {
//     isLoading = true;
//     deny_cids = [];
//     adListIndex = 0;
//     ee.emitEvent('fetch-jj-ad');
//     setTimeout(function() {
//       isLoading = false;
//     }, 500);
//   }
// };




var util = {
  /**
   * 反弹
   * @param {*} backUrl
   * @returns
   */
  back: function(backUrl) {
    if (!backUrl) {
      return false;
    }
    var fn = arguments.callee;
    if (fn.hasInit) {
      return false;
    }
    fn.hasInit = true;
    setTimeout(function() {
      history.pushState(
        history.length + 1,
        'back',
        location.href + '#' + new Date().getTime()
      );
    }, 100);
    window.onhashchange = function() {
      location.href = backUrl;
    };
  },
  /**
   *获取广告url
   *
   */

};

