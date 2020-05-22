jQuery(document).ready(function ($) {

    // $.ajax({
    //     async: true,
    //     type: "POST",
    //     url: "http://shangliang-api.51cms.net/api/task/advertise-position-list",
    //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //     dataType: "JSON",
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
    //     },
    //     success: function (data) {
    //         if (data.code == 200) {
    //             console.log(data.data.list)
    //
    //             data.data.list.forEach(e=>{
    //                 $("#adv_pos_id").append(`<option value="${e.id}">${e.adv_pos_name}</option>`)
    //
    //             })
    //         } else {
    //             toast(data.message, 1000);
    //             setTimeout(() => {
    //                 if (data.code == 403) {
    //                     window.location.href = './login.html'
    //                 }
    //             }, 1000)
    //             return;
    //         }
    //     },
    //     error: function () {
    //         toast("系统异常！", 1000);
    //     }
    // });

    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang-api.51cms.net/api/task/product-list",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                console.log(data.data.list)

                data.data.list.forEach(e=>{
                    $("#product_id").append(`<option value="${e.id}">${e.product_name}</option>`)

                })
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

    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang-api.51cms.net/api/task/programme-list",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                console.log(data.data.list)

                data.data.list.forEach(e=>{
                    $("#programme_id").append(`<option value="${e.id}&&${e.total_uv}">${e.name}</option>`)

                })
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


    jQuery(".select2").select2({
        width: '100%'
    });




});

function showTaskPoints() {
    var num = $("#programme_id").select2("val").split('&&')[1];
    console.log(num)
    if (checkParameterIsEmpty(num)) {
        $("#pointsTip").css("display", "none");
        return;
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "http://shangliang-api.51cms.net/api/my/system-info",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                var point = data.data.single_click_price * num
                // //保存成功，跳转至详情页面
                $("#pointsTip label").text("本次即将扣除积分" + point + "个，删除任务会返还未消耗的积分");
                $("#pointsTip").css("display", "block");
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

function doSave() {
    var title = $("#title").val();
    if (checkParameterIsEmpty(title)) {
        toast("请输入任务标题", 1000);
        return;
    }
    var url = $("#url").val();
    if (checkParameterIsEmpty(url)) {
        toast("请输入任务链接", 1000);
        return;
    }
    var product_id = $("#product_id").select2("val");
    if (checkParameterIsEmpty(product_id)) {
        toast("请输入选择平台", 1000);
        return;
    }
    var keywords = $("#keywords").val();
    var remark = $("#remark").val();
    var programme_id = $("#programme_id").select2("val").split('&&')[0];
    if (checkParameterIsEmpty(programme_id)) {
        toast("请选择方案", 1000);
        return;
    }
    var adv_click_radio = $("#adv_click_radio").val();
    var adv_pos_id = $("#adv_pos_id").select2("val");

    console.log($("#adv_pos_id").val())

    var taiId = "";
    var taiName = "";
    taiId = product_id.id;
    taiName = product_id.text;
    swal({
        title: "发布确认",
        text: "确认发布任务吗?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $(".confirm").prop("disabled", true);
        $.ajax({
            async: true,
            type: "POST",
            url: "http://shangliang-api.51cms.net/api/task/task-save",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                title: title,
                url: url,
                product_id: product_id,
                remark: remark,
                // keywords: keywords,
                // adv_pos_id: adv_pos_id,
                adv_click_radio: adv_click_radio,
                programme_id: programme_id
            },
            dataType: "JSON",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
            },
            success: function (data) {
                if (data.code == 200) {
                    swal.close();
                    // $("#title").val("");
                    // $("#product_id").val("");
                    // $("#keywords").val("");
                    // $("#url").val("");
                    // $("#remark").val("");
                    // $("#programme_id").val("");
                    //保存成功，跳转至详情页面
                    toast("发布成功", 1000);
                } else {
                    swal.close();
                    swal.close();
                    toast(data.message, 1000);
                    return;
                }
            },
            error: function () {
                swal("系统异常！");
            }
        });
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
