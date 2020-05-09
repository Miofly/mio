var myqrsize = '200' // 二维码的大小：100-600
var myqrlogimgsrc = 'http://192.168.4.3:8888/test/1.jpg' // 二维码中间的本地图片路径,这里必须有
var myqrnote = '11' // 二维码上面的文字
var myurl = "https://uniapp.dcloud.io/component/image" // 二维码的域名或其他信息

var LiftOrRight = 'left:50px;';
var TopOrBottom = 'bottom: 0';
qraa();

function qraa() {
    $('body').append('<div id="showqr" style="z-index:99999;position: fixed;' + LiftOrRight + TopOrBottom + '">' +
        '<p id="myqrnote" align="center">' + myqrnote + '</p><img  id="logoimg" src="' + myqrlogimgsrc + '" style="display:none"/>' +
        '</div>');

    var qrurl = myurl
    $("#qrAnonymous").remove();

    var qr1 = decodeURIComponent(qrurl);
    var qr2 = utf16to8(qr1)

    $('#showqr').qrcode({
        render: "canvas",
        width: myqrsize,
        height: myqrsize,
        crossorigin: "anonymous",
        text: qr2,
    })

    var canvas = document.getElementById("canvasId")
    var ctx = canvas.getContext("2d")

    var logimgheight = $("#logoimg").height()
    var thiswwwurl = document.domain.split(".").slice(-2).join(".")

    if (logimgheight && myqrlogimgsrc && myqrlogimgsrc.indexOf(thiswwwurl) >= 0) {
        ctx.drawImage(logoimg, myqrsize * 5 / 12, myqrsize * 5 / 12, myqrsize / 6, myqrsize / 6)
    }

    var ctx = canvas.getContext('2d')
    var imgsrc = convertCanvasToImage(ctx)

    function convertCanvasToImage(ctx) {
        var image = new Image();
        image.crossOrigin = "Anonymous"
        image.id = "qrAnonymous"
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    $("#canvasId").remove()
    $('#showqr').append(imgsrc)

    var width = myqrsize;
    var height = myqrsize;

    $("#qrAnonymous").css({
        "height": height,
        "width": width
    })
    $("#canvasId").css({
        "height": height,
        "width": width
    })

}
