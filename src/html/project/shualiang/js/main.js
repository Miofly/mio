jQuery(document).ready(function ($) {
    clearInterval(MyMar)
    //横向滚动 需要设置div的宽度
    var speed = 30
    marquePic2.innerHTML = marquePic1.innerHTML

    function Marquee() {
        if (demo.scrollLeft >= marquePic1.scrollWidth) {
            demo.scrollLeft = 0
        } else {
            demo.scrollLeft++
        }
    }

    var MyMar = setInterval(Marquee, speed)
    demo.onmouseover = function () {
        clearInterval(MyMar)
    }
    demo.onmouseout = function () {
        MyMar = setInterval(Marquee, speed)
    }

    // 公告
    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang.52eja.com:443/api/config/notice-list",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                $('.announcement').html(data.data.data[0].content)
            } else {
                toast(data.message, 1000);
                setTimeout(() => {
                    if (data.code == 403) {
                        window.location.href = 'login.html'
                    }
                }, 1000)
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });

    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang.52eja.com:443/api/my/member-info",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {

                $('#myName').html(data.data.username)
            } else {
                toast(data.message, 1000);
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });

    // $.ajax({
    //     async: true,
    //     type: "POST",
    //     url: "http://shangliang.52eja.com:443/api/my/system-info",
    //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //     dataType: "JSON",
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
    //     },
    //     success: function (data) {
    //         if (data.code == 200) {
    //             console.log(data.data)
    //         } else {
    //             toast(data.message, 1000);
    //             return;
    //         }
    //     },
    //     error: function () {
    //         toast("系统异常！", 1000);
    //     }
    // });
});

function pointsAdd() {
    window.location.href = "pointsAdd.html";
}
