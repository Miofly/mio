function textCanvas(text, symbol) { // canvas文字换行
    var temp = "";
    var chr = text.split(symbol);
    for (var a = 0; a < chr.length; a++) {
        row.push(temp);
        temp = "";
        temp += chr[a];
    }
    return temp
}

function convertCanvasToImage(canvas, el) { // 将canvas合成的图片绘制到div中
    var hc_image = new Image();
    hc_image.src = canvas.toDataURL("image/png");
    el.html(hc_image);
}
