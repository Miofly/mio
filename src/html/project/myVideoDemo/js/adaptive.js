var adaptive = {};
(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var devicePixelRatio = win.devicePixelRatio;
    var dpr = 1;
    var scale = 1;

    function setViewport() {
        var isIPhone = /iphone/gi.test(win.navigator.appVersion);
        if (lib.scaleType === 2 && isIPhone || lib.scaleType === 3) {
            dpr = devicePixelRatio
        }
        win.devicePixelRatioValue = dpr;
        scale = 1 / dpr;
        var hasMetaEl = doc.querySelector('meta[name="viewport"]');
        var metaStr = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';
        if (dpr === 1) {
            metaStr = 'width=device-width, '.concat(metaStr)
        }
        if (!isIPhone && dpr !== 1) {
            metaStr = metaStr.concat(', target-densitydpi=device-dpi')
        }
        if (hasMetaEl) {
            hasMetaEl.setAttribute('content', metaStr)
        } else {
            var metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', metaStr);
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl)
            } else {
                var containDiv = doc.createElement('div');
                containDiv.appendChild(metaEl);
                docEl.appendChild(containDiv)
            }
        }
    }

    var newBase = 100;
    lib.errDpr = 1;

    function setRem() {
        var layoutView;
        if (lib.maxWidth) {
            layoutView = Math.min(docEl.getBoundingClientRect().width, lib.maxWidth * dpr)
        } else {
            layoutView = docEl.getBoundingClientRect().width
        }
        newBase = 100 * layoutView / lib.desinWidth * (lib.errDpr || 1);
        docEl.style.fontSize = newBase + 'px';
        doc.body && (doc.body.style.fontSize = lib.baseFont / 100 + 'rem');
        lib.setRemCallback && lib.setRemCallback();
        lib.newBase = newBase
    }

    var tid;
    lib.desinWidth = 750;
    lib.baseFont = 28;
    lib.reflow = function () {
        docEl.clientWidth
    };

    function checkRem() {
        if (/android/ig.test(win.navigator.appVersion)) {
            var hideDiv = document.createElement('p');
            hideDiv.style.height = '1px';
            hideDiv.style.width = '2.5rem';
            hideDiv.style.visibility = 'hidden';
            document.body.appendChild(hideDiv);
            var now = hideDiv.offsetWidth;
            var right = lib.newBase * 2.5;
            if (Math.abs(right / now - 1) > 0.05) {
                lib.errDpr = right / now;
                setRem()
            }
            document.body.removeChild(hideDiv)
        }
    }

    lib.init = function () {
        win.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(setRem, 300)
        }, false);
        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(setRem, 300)
            }
        }, false);
        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = lib.baseFont / 100 + 'rem';
            checkRem()
        } else {
            doc.addEventListener('DOMContentLoaded', function (e) {
                doc.body.style.fontSize = lib.baseFont / 100 + 'rem';
                checkRem()
            }, false)
        }
        setViewport();
        setRem();
        docEl.setAttribute('data-dpr', dpr)
    };
    lib.remToPx = function (remValue) {
        return remValue * newBase
    }
})(window, adaptive);
if (typeof module != 'undefined' && module.exports) {
    module.exports = adaptive
} else if (typeof define == 'function' && define.amd) {
    define(function () {
        return adaptive
    })
} else {
    window.adaptive = adaptive
}
window['adaptive'].desinWidth = 750;
window['adaptive'].baseFont = 28;
window['adaptive'].maxWidth = 750;
window['adaptive'].scaleType = 1;
window['adaptive'].init();
