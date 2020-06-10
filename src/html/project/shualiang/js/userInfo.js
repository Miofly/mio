jQuery(document).ready(function ($) {
    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/my/member-info",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                $('#id').html(data.data.id)
                $('#inviter_code').html(data.data.inviter_code)
                $('#mobile').html(data.data.mobile)
                $('#points').html(data.data.points)
                $('#qq').html(data.data.qq)
                $('#username').html(data.data.username)
                $('#wechat').html(data.data.wechat)
            } else {
                toast(data.message, 1000);
                setTimeout(() => {
                    if (data.code == 403) {
                        window.location.href = './login.html'
                    }
                }, 1000)
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });

});

function changePassword() {
    $("#passwordForm")[0].reset();
    $("#paraAddBtn").click();
}

function setPay() {
    $("#payForm")[0].reset();
    $("#payBtn").click();
}

function loadMenu(url) {
    $("#mainFrame").attr("src", url);
}

function showDetail() {
    window.location.href = "showPointsDetail.html";
}

function logout() {
    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/auth/log-out",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                toast(data.message, 1000);
                setTimeout(() => {
                    window.location.href = './login.html'
                }, 2000)
            } else {
                toast(data.message, 1000);
                setTimeout(() => {
                    if (data.code == 403) {
                        window.location.href = './login.html'
                    }
                }, 1000)
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });
}

// function updatePayInfo() {
//     var userName = $("#payTele").val();
//     var payAccount = $("#payAccount").val();
//     if (checkParameterIsEmpty(payAccount)) {
//         toast("请输入支付宝账号", 1000);
//         return;
//     }
//     var payName = $("#payName").val();
//     if (checkParameterIsEmpty(payName)) {
//         toast("请输入真实姓名", 1000);
//         return;
//     }
//     $.ajax({
//         async: true,
//         type: "POST",
//         url: "/wxTask/dashboard/updatePayInfo.action",
//         contentType: "application/x-www-form-urlencoded; charset=utf-8",
//         data: {
//             userName: userName,
//             payAccount: payAccount,
//             payName: payName
//         },
//         dataType: "JSON",
//         success: function (data) {
//             if (data.code == 200) {
//                 window.location.reload();
//             } else {
//                 toast("设置失败", 1000);
//                 return;
//             }
//         },
//         error: function () {
//             toast("系统异常！", 1000);
//         }
//     });
// }


function checkNum(value) {
    return /^[\d|\.]*$/.test(value)
}


function doChange() {
    var userName = $("#userName").val();
    var old_password = $("#old_password").val();



    if (checkParameterIsEmpty(old_password)) {
        toast("请输入原密码", 1000);
        return;
    }
    if (old_password.length < 6) {
        toast("密码不得少于6位", 1000);
        return;
    }


    var new_password = $("#new_password").val();

    if (checkParameterIsEmpty(new_password)) {
        toast("请输入新密码", 1000);
        return;
    }

    if (new_password.length < 6) {
        toast("密码不得少于6位", 1000);
        return;
    }

    if (checkNum(new_password)) {
        toast("密码必须是数字与字母的组合", 1000);
        return;
    }

    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/auth/forget",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            old_password: old_password,
            new_password: new_password
        },
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                toast("修改成功", 1000);
                $('#addArea').hide()
                $("#passwordAddBtn").click();
            } else {
                toast(data.message, 1000);
                setTimeout(() => {
                    if (data.code == 403) {
                        window.location.href = './login.html'
                    }
                }, 1000)
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });
}

//检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter) {
    if (parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined) {
        return true;
    } else {
        return false;
    }
}
