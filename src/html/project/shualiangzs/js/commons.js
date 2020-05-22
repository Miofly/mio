

function checkPhone(value) {
    return /^1[23456789]\d{9}$/.test(value);
}

function checkNum(value) {
    return /^[\d|\.]*$/.test(value)
}

function commons() {
    var username = $("#username").val();
    if (checkParameterIsEmpty(username)) {
        toast("请输入账号", 1000);
        return;
    }
    var password = $("#password").val();
    if (checkParameterIsEmpty(password)) {
        toast("请输入登录密码", 1000);
        return;
    }
    if (password.length < 6) {
        toast("密码不得少于6位", 1000);
        return;
    }
    if (checkNum(password)) {
        toast("密码必须是数字与字母的组合", 1000);
        return;
    }
    var repassword = $("#repassword").val();
    if (checkParameterIsEmpty(repassword)) {
        toast("请输入确认密码", 1000);
        return;
    }
    if (password != repassword) {
        toast("密码确认与密码不一致", 1000);
        return;
    }
    var mobile = $("#mobile").val();
    if (checkParameterIsEmpty(mobile)) {
        toast("请输入手机号码", 1000);
        return;
    }
    if (!checkPhone(mobile)) {
        toast("请输入正确的手机号码", 1000);
        return;
    }
    var qq = $("#qq").val();
    if (checkParameterIsEmpty(qq)) {
        toast("请输入QQ号码", 1000);
        return;
    }
    if (qq.length < 6) {
        toast("qq不得少于6位", 1000);
        return;
    }
    var wechat = $("#wechat").val();
    if (checkParameterIsEmpty(wechat)) {
        toast("请输入微信号", 1000);
        return;
    }

    // var inviteCode = $("#inviteCode").val();
    // if (checkParameterIsEmpty(inviteCode)) {
    //     toast("请输入邀请码", 1000);
    //     return;
    // }
    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang-api.51cms.net/api/auth/register",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            username: username,
            mobile: mobile,
            // inviteCode: inviteCode,
            password: password,
            repassword: repassword,
            qq: qq,
            wechat: wechat,
        },
        dataType: "JSON",
        success: function (data) {
            if (data.code == 200) {
                toast("注册成功", 1000);
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000)
                //保存成功，跳转至详情页面
            } else {
                toast(data.message, 1000);
                return;
            }
        },
        error: function () {
            toast("系统异常", 1000);
        }
    })
}

// 检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter) {
    if (parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined) {
        return true;
    } else {
        return false;
    }
}

function login() {
    var username = $("#username").val();
    if (checkParameterIsEmpty(username)) {
        toast("请输入账号", 1000);
        return;
    }
    var password = $("#password").val();
    if (checkParameterIsEmpty(password)) {
        toast("请输入登录密码", 1000);
        return;
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang-api.51cms.net/api/auth/login",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            username: username,
            password: password
        },
        dataType: "JSON",
        success: function (data) {
            if (data.code == 200) {
                localStorage.setItem('TOKEN_KEY_SL', data.data.token)
                window.location.href = './main.html'
            } else {
                toast(data.message, 1000);
                return;
            }
        },
        error: function () {
            swal("系统异常！");
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

function doView() {
    window.location.href = "/wxTask/dashboard/pointsList.action";
}

