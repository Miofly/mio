/*
 * @Author: chenlong
 * @Date: 2019-04-16 10:51:12
 * @Last Modified by: chenlong
 * @Last Modified time: 2019-04-16 11:36:40
 */
(function () {
    var SHARE = '_share';
    var E_LZ = 'e_lz';
    var UUID = 'uuid';

    var isPlayed = false;

    /**
     * 获取当前url所有参数
     * @returns
     */
    function getUrlParams() {
        var qs = location.search.split('+').join(' ');
        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        while ((tokens = re.exec(qs))) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }

    /**
     * 发送请求
     * @date 2019-04-16
     * @param {*} url
     */
    function sendRequest(url) {
        new Image().src = url;
    }

    //统计对象
    var TJ = function () {
    };

    TJ.prototype = {
        constructor: TJ,

        /**
         * 统计分享次数
         * @param {*} shareCount
         * @returns
         */
        share: function (shareCount) {
            var urlParams = getUrlParams();
            //url含有_share 则return
            if (urlParams[SHARE]) return;

            if (urlParams[E_LZ]) {
                sendRequest(
                    'http://lzapi.qd2020.cn/stat/share_success/?e=' +
                    urlParams[E_LZ] +
                    '&share_times=' +
                    shareCount
                );
            }
            if (urlParams[UUID]) {
                sendRequest(
                    'https://1201025296535677.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/guide-hello_world/start_up/?uuid=' +
                    urlParams[UUID] +
                    '&share=' +
                    shareCount
                );
            }
        },
    };

    window.TJ = new TJ();
})();
