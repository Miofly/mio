// $(function () {
// 免接口分享
// var ad_url = "<?= $advertising ?>";
var shareATimes = 0
var shareTTimes = 0
var hiddenProperty = 'hidden' in document ? 'hidden'
    : 'webkitHidden' in document ? 'webkitHidden'
        : 'mozHidden' in document ? 'mozHidden'
            : null
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
var onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
        window.show_time = Date.now()
        if (show_time - hidden_time > 100) {
            // if (show_time - hidden_time > 0) {
            shareATimes += 1
            if (shareATimes > 4) {
                shareTTimes += 1
                setTimeout(share_tip(shareATimes, shareTTimes), 100)
            } else {
                setTimeout(share_tip(shareATimes, -1), 100)
            }
        } else {
            console.log(11)
            // alert('分享失败')
        }
    } else {
        window.hidden_time = Date.now()
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange) // 监听

function share_tip(share_app_times, share_timeline_times) { // 分享处理
    console.log('处理了吗')

    if (share_timeline_times == -1) {
        if (shareATimes == 1) {
            $('#modal').css('animation', 'shakeOne 2s 2 linear')
            $('#fscg').html('发送成功<br>')
            $('#jx').html('请您继续分享视频至<br><span style="font-size: 1.3rem">\n' +
                '\t\t\t<span style="color: red;font-weight: bold">2</span>个微信群</span>\n' +
                '\t\t\t<br>分享后立即观看VIP免费视频')
        } else if (shareATimes == 2) {
            $('#modal').css('animation', 'shakeTwo 2s 2 linear')
            $('#jx').html('请您继续分享视频至<br><span style="font-size: 1.3rem">\n' +
                '\t\t\t<span style="color: red;font-weight: bold">1</span>个微信群</span>\n' +
                '\t\t\t<br>分享后立即观看VIP免费视频')
        } else {

        }
    }
}

// })


setTimeout(() => {
    $('#modal').css('opacity', 1)
    $('#figure').css('opacity', 1)
}, 100)
