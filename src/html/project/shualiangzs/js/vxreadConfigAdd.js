jQuery(document).ready(function ($) {

    $('#h01Min').val(0)
    $('#h02Min').val(0)
    $('#h03Min').val(0)
    $('#h04Min').val(0)
    $('#h05Min').val(0)
    $('#h06Min').val(0)
    $('#h07Min').val(0)
    $('#h08Min').val(0)
    $('#h09Min').val(0)
    $('#h10Min').val(0)
    $('#h11Min').val(0)
    $('#h12Min').val(0)
    $('#h13Min').val(0)
    $('#h14Min').val(0)
    $('#h15Min').val(0)
    $('#h16Min').val(0)
    $('#h17Min').val(0)
    $('#h18Min').val(0)
    $('#h19Min').val(0)
    $('#h20Min').val(0)
    $('#h21Min').val(0)
    $('#h22Min').val(0)
    $('#h23Min').val(0)
    $('#h24Min').val(0)
    $('#total_uv').val(parseInt($('#h01Min').val()) + parseInt($('#h02Min').val()))
    $('.minInput').bind('input propertychange', function(){
        console.log($('#h01Min').val().length)
        if ($('#h01Min').val().length == 2 && $('#h01Min').val().slice(0,1) == 0) {
            $('#h01Min').val($('#h01Min').val().slice(1))
        }
        if ($('#h02Min').val().length == 2 &&$('#h02Min').val().slice(0,1) == 0) {
            $('#h02Min').val($('#h02Min').val().slice(1))
        }
        if ($('#h03Min').val().length == 2 &&$('#h03Min').val().slice(0,1) == 0) {
            $('#h03Min').val($('#h03Min').val().slice(1))
        }
        if ($('#h04Min').val().length == 2 &&$('#h04Min').val().slice(0,1) == 0) {
            $('#h04Min').val($('#h04Min').val().slice(1))
        }
        if ($('#h05Min').val().length == 2 &&$('#h05Min').val().slice(0,1) == 0) {
            $('#h05Min').val($('#h05Min').val().slice(1))
        }
        if ($('#h06Min').val().length == 2 &&$('#h06Min').val().slice(0,1) == 0) {
            $('#h06Min').val($('#h06Min').val().slice(1))
        }
        if ($('#h07Min').val().length == 2 &&$('#h07Min').val().slice(0,1) == 0) {
            $('#h07Min').val($('#h07Min').val().slice(1))
        }
        if ($('#h08Min').val().length == 2 &&$('#h08Min').val().slice(0,1) == 0) {
            $('#h08Min').val($('#h08Min').val().slice(1))
        }
        if ($('#h09Min').val().length == 2 &&$('#h09Min').val().slice(0,1) == 0) {
            $('#h09Min').val($('#h09Min').val().slice(1))
        }
        if ($('#h10Min').val().length == 2 &&$('#h10Min').val().slice(0,1) == 0) {
            $('#h10Min').val($('#h10Min').val().slice(1))
        }
        if ($('#h11Min').val().length == 2 &&$('#h11Min').val().slice(0,1) == 0) {
            $('#h11Min').val($('#h11Min').val().slice(1))
        }
        if ($('#h12Min').val().length == 2 &&$('#h12Min').val().slice(0,1) == 0) {
            $('#h12Min').val($('#h12Min').val().slice(1))
        }
        if ($('#h13Min').val().length == 2 &&$('#h13Min').val().slice(0,1) == 0) {
            $('#h13Min').val($('#h13Min').val().slice(1))
        }
        if ($('#h14Min').val().length == 2 &&$('#h14Min').val().slice(0,1) == 0) {
            $('#h14Min').val($('#h14Min').val().slice(1))
        }
        if ($('#h15Min').val().length == 2 &&$('#h15Min').val().slice(0,1) == 0) {
            $('#h15Min').val($('#h15Min').val().slice(1))
        }
        if ($('#h16Min').val().length == 2 &&$('#h16Min').val().slice(0,1) == 0) {
            $('#h16Min').val($('#h16Min').val().slice(1))
        }
        if ($('#h17Min').val().length == 2 &&$('#h17Min').val().slice(0,1) == 0) {
            $('#h17Min').val($('#h17Min').val().slice(1))
        }
        if ($('#h18Min').val().length == 2 &&$('#h18Min').val().slice(0,1) == 0) {
            $('#h18Min').val($('#h18Min').val().slice(1))
        }
        if ($('#h19Min').val().length == 2 &&$('#h19Min').val().slice(0,1) == 0) {
            $('#h19Min').val($('#h19Min').val().slice(1))
        }
        if ($('#h20Min').val().length == 2 &&$('#h20Min').val().slice(0,1) == 0) {
            $('#h20Min').val($('#h20Min').val().slice(1))
        }
        if ($('#h21Min').val().length == 2 &&$('#h21Min').val().slice(0,1) == 0) {
            $('#h21Min').val($('#h21Min').val().slice(1))
        }
        if ($('#h22Min').val().length == 2 &&$('#h22Min').val().slice(0,1) == 0) {
            $('#h22Min').val($('#h22Min').val().slice(1))
        }
        if ($('#h23Min').val().length == 2 &&$('#h23Min').val().slice(0,1) == 0) {
            $('#h23Min').val($('#h23Min').val().slice(1))
        }
        if ($('#h24Min').val().length == 2 &&$('#h24Min').val().slice(0,1) == 0) {
            $('#h24Min').val($('#h24Min').val().slice(1))
        }

        var hh01 = isNaN(parseInt($('#h01Min').val())) ? 0 : parseInt($('#h01Min').val())
        var hh02 = isNaN(parseInt($('#h02Min').val())) ? 0 : parseInt($('#h02Min').val())
        var hh03 = isNaN(parseInt($('#h03Min').val())) ? 0 : parseInt($('#h03Min').val())
        var hh04 = isNaN(parseInt($('#h04Min').val())) ? 0 : parseInt($('#h04Min').val())
        var hh05 = isNaN(parseInt($('#h05Min').val())) ? 0 : parseInt($('#h05Min').val())
        var hh06 = isNaN(parseInt($('#h06Min').val())) ? 0 : parseInt($('#h06Min').val())
        var hh07 = isNaN(parseInt($('#h07Min').val())) ? 0 : parseInt($('#h07Min').val())
        var hh08 = isNaN(parseInt($('#h08Min').val())) ? 0 : parseInt($('#h08Min').val())
        var hh09 = isNaN(parseInt($('#h09Min').val())) ? 0 : parseInt($('#h09Min').val())
        var hh10 = isNaN(parseInt($('#h10Min').val())) ? 0 : parseInt($('#h10Min').val())
        var hh11 = isNaN(parseInt($('#h11Min').val())) ? 0 : parseInt($('#h11Min').val())
        var hh12 = isNaN(parseInt($('#h12Min').val())) ? 0 : parseInt($('#h12Min').val())
        var hh13 = isNaN(parseInt($('#h13Min').val())) ? 0 : parseInt($('#h13Min').val())
        var hh14 = isNaN(parseInt($('#h14Min').val())) ? 0 : parseInt($('#h14Min').val())
        var hh15 = isNaN(parseInt($('#h15Min').val())) ? 0 : parseInt($('#h15Min').val())
        var hh16 = isNaN(parseInt($('#h16Min').val())) ? 0 : parseInt($('#h16Min').val())
        var hh17 = isNaN(parseInt($('#h17Min').val())) ? 0 : parseInt($('#h17Min').val())
        var hh18 = isNaN(parseInt($('#h18Min').val())) ? 0 : parseInt($('#h18Min').val())
        var hh19 = isNaN(parseInt($('#h19Min').val())) ? 0 : parseInt($('#h19Min').val())
        var hh20 = isNaN(parseInt($('#h20Min').val())) ? 0 : parseInt($('#h20Min').val())
        var hh21 = isNaN(parseInt($('#h21Min').val())) ? 0 : parseInt($('#h21Min').val())
        var hh22 = isNaN(parseInt($('#h22Min').val())) ? 0 : parseInt($('#h22Min').val())
        var hh23 = isNaN(parseInt($('#h23Min').val())) ? 0 : parseInt($('#h23Min').val())
        var hh24 = isNaN(parseInt($('#h24Min').val())) ? 0 : parseInt($('#h24Min').val())




        $('#total_uv').val(
            hh01 + hh02 + hh03 + hh04 + hh05 + hh06 + hh07 + hh08 + hh09 + hh10 + hh11 + hh12 + hh13 + hh14 + hh15 + hh16 + hh17 + hh18 + hh19 + hh20 + hh21 + hh22 + hh23 +hh24
        )

        // if ($('#total_uv').val() > 1000) {
        //     toast("一小时的总浏览量必须小于等于1000", 1000);
        // }
    })

});

function doSave() {
    var name = $("#name").val();
    if (checkParameterIsEmpty(name)) {
        toast("请输入方案名称", 1000);
        return;
    }
    var remark = $("#remark").val();
    if (checkParameterIsEmpty(remark)) {
        toast("请输入备注", 1000);
        return;
    }
    var total_uv = $("#total_uv").val();
    if (checkParameterIsEmpty(total_uv)) {
        toast("请输入总浏览量", 1000);
        return;
    }

    if (total_uv == 0) {
        toast("总浏览量必须大于0", 1000);
        return;
    }

    // if (total_uv > 1000) {
    //     toast("一小时的总浏览量必须小于等于1000", 1000);
    //     return;
    // }

    swal({
        title: "保存确认",
        text: "确认保存模板配置吗?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $(".confirm").prop("disabled", true);

        var hh01 = isNaN(parseInt($('#h01Min').val())) ? 0 : parseInt($('#h01Min').val())
        var hh02 = isNaN(parseInt($('#h02Min').val())) ? 0 : parseInt($('#h02Min').val())
        var hh03 = isNaN(parseInt($('#h03Min').val())) ? 0 : parseInt($('#h03Min').val())
        var hh04 = isNaN(parseInt($('#h04Min').val())) ? 0 : parseInt($('#h04Min').val())
        var hh05 = isNaN(parseInt($('#h05Min').val())) ? 0 : parseInt($('#h05Min').val())
        var hh06 = isNaN(parseInt($('#h06Min').val())) ? 0 : parseInt($('#h06Min').val())
        var hh07 = isNaN(parseInt($('#h07Min').val())) ? 0 : parseInt($('#h07Min').val())
        var hh08 = isNaN(parseInt($('#h08Min').val())) ? 0 : parseInt($('#h08Min').val())
        var hh09 = isNaN(parseInt($('#h09Min').val())) ? 0 : parseInt($('#h09Min').val())
        var hh10 = isNaN(parseInt($('#h10Min').val())) ? 0 : parseInt($('#h10Min').val())
        var hh11 = isNaN(parseInt($('#h11Min').val())) ? 0 : parseInt($('#h11Min').val())
        var hh12 = isNaN(parseInt($('#h12Min').val())) ? 0 : parseInt($('#h12Min').val())
        var hh13 = isNaN(parseInt($('#h13Min').val())) ? 0 : parseInt($('#h13Min').val())
        var hh14 = isNaN(parseInt($('#h14Min').val())) ? 0 : parseInt($('#h14Min').val())
        var hh15 = isNaN(parseInt($('#h15Min').val())) ? 0 : parseInt($('#h15Min').val())
        var hh16 = isNaN(parseInt($('#h16Min').val())) ? 0 : parseInt($('#h16Min').val())
        var hh17 = isNaN(parseInt($('#h17Min').val())) ? 0 : parseInt($('#h17Min').val())
        var hh18 = isNaN(parseInt($('#h18Min').val())) ? 0 : parseInt($('#h18Min').val())
        var hh19 = isNaN(parseInt($('#h19Min').val())) ? 0 : parseInt($('#h19Min').val())
        var hh20 = isNaN(parseInt($('#h20Min').val())) ? 0 : parseInt($('#h20Min').val())
        var hh21 = isNaN(parseInt($('#h21Min').val())) ? 0 : parseInt($('#h21Min').val())
        var hh22 = isNaN(parseInt($('#h22Min').val())) ? 0 : parseInt($('#h22Min').val())
        var hh23 = isNaN(parseInt($('#h23Min').val())) ? 0 : parseInt($('#h23Min').val())
        var hh24 = isNaN(parseInt($('#h24Min').val())) ? 0 : parseInt($('#h24Min').val())


        // console.log($('#sle01'))

        var uvos = [
            {"state_uv": hh01,"os_type": $('#sle01 input[name="type01"]:checked').val()},
            {"state_uv": hh02,"os_type": $('#sle02 input[name="type02"]:checked').val()},
            {"state_uv": hh03,"os_type": $('#sle03 input[name="type03"]:checked').val()},
            {"state_uv": hh04,"os_type": $('#sle04 input[name="type04"]:checked').val()},
            {"state_uv": hh05,"os_type": $('#sle05 input[name="type05"]:checked').val()},
            {"state_uv": hh06,"os_type": $('#sle06 input[name="type06"]:checked').val()},
            {"state_uv": hh07,"os_type": $('#sle07 input[name="type07"]:checked').val()},
            {"state_uv": hh08,"os_type": $('#sle08 input[name="type08"]:checked').val()},
            {"state_uv": hh09,"os_type": $('#sle09 input[name="type09"]:checked').val()},
            {"state_uv": hh10,"os_type": $('#sle10 input[name="type10"]:checked').val()},
            {"state_uv": hh11,"os_type": $('#sle11 input[name="type11"]:checked').val()},
            {"state_uv": hh12,"os_type": $('#sle12 input[name="type12"]:checked').val()},
            {"state_uv": hh13,"os_type": $('#sle13 input[name="type13"]:checked').val()},
            {"state_uv": hh14,"os_type": $('#sle14 input[name="type14"]:checked').val()},
            {"state_uv": hh15,"os_type": $('#sle15 input[name="type15"]:checked').val()},
            {"state_uv": hh16,"os_type": $('#sle16 input[name="type16"]:checked').val()},
            {"state_uv": hh17,"os_type": $('#sle17 input[name="type17"]:checked').val()},
            {"state_uv": hh18,"os_type": $('#sle18 input[name="type18"]:checked').val()},
            {"state_uv": hh19,"os_type": $('#sle19 input[name="type19"]:checked').val()},
            {"state_uv": hh20,"os_type": $('#sle20 input[name="type20"]:checked').val()},
            {"state_uv": hh21,"os_type": $('#sle21 input[name="type21"]:checked').val()},
            {"state_uv": hh22,"os_type": $('#sle22 input[name="type22"]:checked').val()},
            {"state_uv": hh23,"os_type": $('#sle23 input[name="type23"]:checked').val()},
            {"state_uv": hh24,"os_type": $('#sle24 input[name="type24"]:checked').val()},
        ]

        $.ajax({
            async: true,
            type: "POST",
            url: "http://shangliang-api.51cms.net/api/task/programme-save",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "JSON",
            data: {
                name: name, remark: remark, total_uv: total_uv,phone_type: 1,
                hour_state_uv: JSON.stringify(uvos)
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
            },
            success: function (data) {
                if (data.code == 200) {
                    swal.close();
                    toast(data.message, 1000);
                    console.log(data.data)
                    setTimeout(() => {
                        window.location.href = './planList.html'
                    }, 1000)
                } else {
                    toast(data.message, 1000);
                    swal.close();
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
}

function initradio(rName,rValue){
    var rObj = document.getElementsByName(rName);

    for(var i = 0;i < rObj.length;i++){
        if(rObj[i].value == rValue){
            rObj[i].checked =  'checked';
        }
    }
}

function setHourValue() {
    var minNum = $("#minNum").val();
    if (checkParameterIsEmpty(minNum)) {
        swal("请输入时段浏览量");
        return;
    }

    // var maxNum = $("#maxNum").val();
    // if (checkParameterIsEmpty(maxNum)) {
    //     swal("请输入时段最大浏览量");
    //     return;
    // }
    $(".form-control.minInput").each(function (i, n) {
        $(this).val(minNum);
    });

    $('#total_uv').val(minNum*24)
    // $(".form-control.maxInput").each(function (i, n) {
    //     $(this).val(maxNum);
    // });

}

function setType() {
    var type = $('#yjszType input[name="yjszType"]:checked').val();
    console.log(type)

    initradio('type01', type)
    initradio('type02', type)
    initradio('type03', type)
    initradio('type04', type)
    initradio('type05', type)
    initradio('type06', type)
    initradio('type07', type)
    initradio('type08', type)
    initradio('type09', type)
    initradio('type10', type)
    initradio('type11', type)
    initradio('type12', type)
    initradio('type13', type)
    initradio('type14', type)
    initradio('type15', type)
    initradio('type16', type)
    initradio('type17', type)
    initradio('type18', type)
    initradio('type19', type)
    initradio('type20', type)
    initradio('type21', type)
    initradio('type22', type)
    initradio('type23', type)
    initradio('type24', type)
    // $(".form-control.minInput").each(function (i, n) {
    //     $(this).val(minNum);
    // });
    //
    // $('#total_uv').val(minNum*24)
    // // $(".form-control.maxInput").each(function (i, n) {
    // //     $(this).val(maxNum);
    // // });

}


//检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter) {
    if (parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined) {
        return true;
    } else {
        return false;
    }
}
