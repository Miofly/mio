jQuery(document).ready(function ($) {
    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/task/programme-info",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        data: {
            id: localStorage.getItem('PLAN_ID')
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                var data = data.data
                console.log(data)
                $('#name').val(data.name)
                $('#remark').val(data.remark)
                $('#total_uv').val(data.total_uv)

                for (let i = 0; i < data.hour_state_uv_arr.length; i++) {
                    $('#h01Min').val(data.hour_state_uv_arr[0].state_uv)
                    $('#h02Min').val(data.hour_state_uv_arr[1].state_uv)
                    $('#h03Min').val(data.hour_state_uv_arr[2].state_uv)
                    $('#h04Min').val(data.hour_state_uv_arr[3].state_uv)
                    $('#h05Min').val(data.hour_state_uv_arr[4].state_uv)
                    $('#h06Min').val(data.hour_state_uv_arr[5].state_uv)
                    $('#h07Min').val(data.hour_state_uv_arr[6].state_uv)
                    $('#h08Min').val(data.hour_state_uv_arr[7].state_uv)
                    $('#h09Min').val(data.hour_state_uv_arr[8].state_uv)
                    $('#h10Min').val(data.hour_state_uv_arr[9].state_uv)
                    $('#h11Min').val(data.hour_state_uv_arr[10].state_uv)
                    $('#h12Min').val(data.hour_state_uv_arr[11].state_uv)
                    $('#h13Min').val(data.hour_state_uv_arr[12].state_uv)
                    $('#h14Min').val(data.hour_state_uv_arr[13].state_uv)
                    $('#h15Min').val(data.hour_state_uv_arr[14].state_uv)
                    $('#h16Min').val(data.hour_state_uv_arr[15].state_uv)
                    $('#h17Min').val(data.hour_state_uv_arr[16].state_uv)
                    $('#h18Min').val(data.hour_state_uv_arr[17].state_uv)
                    $('#h19Min').val(data.hour_state_uv_arr[18].state_uv)
                    $('#h20Min').val(data.hour_state_uv_arr[19].state_uv)
                    $('#h21Min').val(data.hour_state_uv_arr[20].state_uv)
                    $('#h22Min').val(data.hour_state_uv_arr[21].state_uv)
                    $('#h23Min').val(data.hour_state_uv_arr[22].state_uv)
                    $('#h24Min').val(data.hour_state_uv_arr[23].state_uv)

                    // $('#sle01 input[name="type01"]').val(data.hour_state_uv_arr[0].os_type).attr("checked","checked");
                    // $('#sle02 input[name="type02"]').val(data.hour_state_uv_arr[1].os_type).attr("checked","checked");
                    // $('#sle03 input[name="type03"]').val(data.hour_state_uv_arr[2].os_type).attr("checked","checked");
                    // $('#sle04 input[name="type04"]').val(data.hour_state_uv_arr[3].os_type).attr("checked","checked");
                    // $('#sle05 input[name="type05"]').val(data.hour_state_uv_arr[4].os_type).attr("checked","checked");
                    // $('#sle06 input[name="type06"]').val(data.hour_state_uv_arr[5].os_type).attr("checked","checked");
                    // $('#sle07 input[name="type07"]').val(data.hour_state_uv_arr[6].os_type).attr("checked","checked");
                    // $('#sle08 input[name="type08"]').val(data.hour_state_uv_arr[7].os_type).attr("checked","checked");
                    // $('#sle09 input[name="type09"]').val(data.hour_state_uv_arr[8].os_type).attr("checked","checked");
                    // $('#sle10 input[name="type10"]').val(data.hour_state_uv_arr[9].os_type).attr("checked","checked");
                    // $('#sle11 input[name="type11"]').val(data.hour_state_uv_arr[10].os_type).attr("checked","checked");
                    // $('#sle12 input[name="type12"]').val(data.hour_state_uv_arr[11].os_type).attr("checked","checked");
                    // $('#sle13 input[name="type13"]').val(data.hour_state_uv_arr[12].os_type).attr("checked","checked");
                    // $('#sle14 input[name="type14"]').val(data.hour_state_uv_arr[13].os_type).attr("checked","checked");
                    // $('#sle15 input[name="type15"]').val(data.hour_state_uv_arr[14].os_type).attr("checked","checked");
                    // $('#sle16 input[name="type16"]').val(data.hour_state_uv_arr[15].os_type).attr("checked","checked");
                    // $('#sle17 input[name="type17"]').val(data.hour_state_uv_arr[16].os_type).attr("checked","checked");
                    // $('#sle18 input[name="type18"]').val(data.hour_state_uv_arr[17].os_type).attr("checked","checked");
                    // $('#sle19 input[name="type19"]').val(data.hour_state_uv_arr[18].os_type).attr("checked","checked");
                    // $('#sle20 input[name="type20"]').val(data.hour_state_uv_arr[19].os_type).attr("checked","checked");
                    // $('#sle21 input[name="type21"]').val(data.hour_state_uv_arr[20].os_type).attr("checked","checked");
                    // $('#sle22 input[name="type22"]').val(data.hour_state_uv_arr[21].os_type).attr("checked","checked");
                    // $('#sle23 input[name="type23"]').val(data.hour_state_uv_arr[22].os_type).attr("checked","checked");
                    // $('#sle24 input[name="type24"]').val(data.hour_state_uv_arr[23].os_type).attr("checked","checked");

                    initradio('type01', data.hour_state_uv_arr[0].os_type);
                    initradio('type02', data.hour_state_uv_arr[1].os_type);
                    initradio('type03', data.hour_state_uv_arr[2].os_type);
                    initradio('type04', data.hour_state_uv_arr[3].os_type);
                    initradio('type05', data.hour_state_uv_arr[4].os_type);
                    initradio('type06', data.hour_state_uv_arr[5].os_type);
                    initradio('type07', data.hour_state_uv_arr[6].os_type);
                    initradio('type08', data.hour_state_uv_arr[7].os_type);
                    initradio('type09', data.hour_state_uv_arr[8].os_type);
                    initradio('type10', data.hour_state_uv_arr[9].os_type);
                    initradio('type11', data.hour_state_uv_arr[10].os_type);
                    initradio('type12', data.hour_state_uv_arr[11].os_type);
                    initradio('type13', data.hour_state_uv_arr[12].os_type);
                    initradio('type14', data.hour_state_uv_arr[13].os_type);
                    initradio('type15', data.hour_state_uv_arr[14].os_type);
                    initradio('type16', data.hour_state_uv_arr[15].os_type);
                    initradio('type17', data.hour_state_uv_arr[16].os_type);
                    initradio('type18', data.hour_state_uv_arr[17].os_type);
                    initradio('type19', data.hour_state_uv_arr[18].os_type);
                    initradio('type20', data.hour_state_uv_arr[19].os_type);
                    initradio('type21', data.hour_state_uv_arr[20].os_type);
                    initradio('type22', data.hour_state_uv_arr[21].os_type);
                    initradio('type23', data.hour_state_uv_arr[22].os_type);
                    initradio('type24', data.hour_state_uv_arr[23].os_type);
                }
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

function initradio(rName, rValue) {
    var rObj = document.getElementsByName(rName);

    for (var i = 0; i < rObj.length; i++) {
        if (rObj[i].value == rValue) {
            rObj[i].checked = 'checked';
        }
    }
}

function getUrlParam(name) { // 获取地址栏参数
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return unescape(r[2])
    return null // 返回参数值
}

function deletePlan() {
    var title = "删除模板确认";
    var message = "确认删除该模板方案吗?";
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
            url: "http://api.51sld.cn/api/task/programme-del",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                id: localStorage.getItem('PLAN_ID')
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
                        window.location.href = "planList.html";
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
