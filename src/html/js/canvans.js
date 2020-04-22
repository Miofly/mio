function createPic(conf, callback) {
    var canvas = document.createElement("canvas");
    canvas.width = conf.imgdata.width;
    canvas.height = conf.imgdata.height;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = conf.imgdata.src;
    img.onload = function () {
        var ewm = new Image();
        ewm.src = conf.ewmdata.src;
        ewm.onload = function () {
            if (conf.txdata && conf.txdata.src) {
                var tx = new Image();
                tx.src = conf.txdata.src;
                tx.onload = function () {
                    ctx.drawImage(img, 0, 0);
                    ctx.drawImage(ewm, conf.ewmdata.left, conf.ewmdata.top, conf.ewmdata.size, conf.ewmdata.size);
                    if (conf.txdata.iscircle) {
                        circleImg(ctx, tx, conf.txdata.left, conf.txdata.top, conf.txdata.size);
                    } else {
                        ctx.drawImage(tx, conf.txdata.left, conf.txdata.top, conf.txdata.size, conf.txdata.size);
                    }
                    if (conf.stringdata) {
                        for (var i in conf.stringdata) {
                            ctx.font = conf.stringdata[i].font;
                            ctx.fillStyle = conf.stringdata[i].fillStyle;
                            if (conf.stringdata[i].iscent) {
                                var _x0 = (conf.imgdata.width - ctx.measureText(conf.stringdata[i].str).width) / 2;
                                ctx.fillText(conf.stringdata[i].str, _x0, conf.stringdata[i].top);
                            } else {
                                ctx.fillText(conf.stringdata[i].str, conf.stringdata[i].left, conf.stringdata[i].top);
                            }
                        }
                    }
                    document.getElementById(conf.id).src = canvas.toDataURL('image/jpeg');
                    // document.getElementById("load-div").style.display = "none";
                    // document.getElementById("loadpage").style.display = "none";
                    document.getElementById("imgn-div").style.display = "block";

                    if (callback) {
                        callback();
                    }

                    setTimeout('setH("img-div")', 100);
                };
            } else {
                ctx.drawImage(img, 0, 0);
                ctx.drawImage(ewm, conf.ewmdata.left, conf.ewmdata.top, conf.ewmdata.size, conf.ewmdata.size);
                if (conf.stringdata) {
                    for (var i in conf.stringdata) {
                        ctx.font = conf.stringdata[i].font;
                        ctx.fillStyle = conf.stringdata[i].fillStyle;
                        if (conf.stringdata[i].iscent) {
                            var _x0 = (conf.imgdata.width - ctx.measureText(conf.stringdata[i].str).width) / 2;
                            ctx.fillText(conf.stringdata[i].str, _x0, conf.stringdata[i].top);
                        } else {
                            ctx.fillText(conf.stringdata[i].str, conf.stringdata[i].left, conf.stringdata[i].top);
                        }
                    }
                }
                document.getElementById(conf.id).src = canvas.toDataURL("image/jpeg");
                //document.getElementById("load-div").style.display = "none";
                //document.getElementById("loadpage").style.display = "none";
                document.getElementById("imgn-div").style.display = "block";
                document.getElementById("list").style.display = "block";
                if (callback) {
                    callback();
                }
            }
        };
    };
}

function circleImg(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
}

function setH(id) {
    // var h = document.body.scrollHeight;
    // var hd = document.getElementById(id).offsetHeight;
    // var hh = h - hd;
    // if (hh > 0) {
    //   document.getElementById(id).style.paddingTop = parseInt(hh / 2) + "px";
    // }
    // var overscroll = function (el) {
    //   el.addEventListener('touchstart', function () {
    //     var top = el.scrollTop,
    //       totalScroll = el.scrollHeight,
    //       currentScroll = top + el.offsetHeight;
    //     if (top === 0) {
    //       el.scrollTop = 1;
    //     } else if (currentScroll === totalScroll) {
    //       el.scrollTop = top - 1;
    //     }
    //   });
    //   el.addEventListener('touchmove', function (evt) {
    //     if (el.offsetHeight < el.scrollHeight) evt._isScroller = true;
    //   });
    // }
    // overscroll(document.getElementById("img-div"));
    // document.body.addEventListener('touchmove', function (evt) {
    //   if (!evt._isScroller) {
    //     evt.preventDefault();
    //   }
    // });

    // //套路列表
    // document.getElementById("list").style.display = "block";
}

//实现将项目的图片转化成base64
function convertImgToBase64(url, callback) {
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/jpeg');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}
