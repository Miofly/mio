
function drawing(n, el, showText = false, textLeft = 50) {
    var len = imgLists.length;

    if (n < len) {
        var img = new Image();
        img.crossOrigin = 'Anonymous'; // 解决跨域
        img.src = imgLists[n].src;
        img.onload = function () {
            ctx.drawImage(img, imgLists[n].left, imgLists[n].top, imgLists[n].width, imgLists[n].height);
            drawing(n + 1, el); // 递归

            if (showText) {
                for (var b = 0; b < row.length; b++) {
                    ctx.fillText(row[b], textLeft, 100 + b * 50);
                }
            }
        }
    } else {
        convertCanvasToImage(canvas, el);
    }
}

function convertCanvasToImage(canvas, el) {
    var hc_image = new Image();
    hc_image.src = canvas.toDataURL("image/png");
    el.html(hc_image);
}
