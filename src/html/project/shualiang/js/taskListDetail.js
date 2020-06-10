jQuery(document).ready(function ($) {
    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/task/task-info",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        data: {
            id: localStorage.getItem('TASK_ID')
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                var data = data.data
                console.log(data)
                $('#uid').val(data.id)
                $('#remark').val(data.remark)
                $('#product_name').val(data.product_name)
                $('#total_uv').val(data.total_uv)
                $('#programme_name').val(data.programme_name)
                $('#title').val(data.title)
                $('#true_total_uv').val(data.true_total_uv)
                $('#uv_completion').val(data.uv_completion)
                $('#url').val(data.url)

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

function getUrlParam(name) { // 获取地址栏参数
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return unescape(r[2])
    return null // 返回参数值
}

function deletePlan() {
    var title = "删除任务确认";
    var message = "确认删除该任务吗?";
    swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            async: true,
            type: "POST",
            url: "http://api.51sld.cn/api/task/task-del",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                id: localStorage.getItem('TASK_ID')
            },
            dataType: "JSON",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
            },
            success: function (data) {
                if (data.code == 200) {
                    swal.close();
                    //保存成功，跳转至详情页面
                    toast("操作成功", 1000);
                    setTimeout(() => {
                        window.location.href = "taskList.html";
                    }, 1000)
                } else {
                    toast(data.msg, 1000);
                    setTimeout(() => {
                        if (data.code == 403) {
                            window.location.href = './login.html'
                        }
                    }, 1000)
                    return;
                }
            },
            error: function () {
                swal("系统异常！");
            }
        });
    });
}
