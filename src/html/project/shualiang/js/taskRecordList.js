jQuery(document).ready(function($) {

    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/api/my/points-list",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                console.log(data.data)

                var list = data.data.list
                console.log(list)
                var html = ''
                $.each(list, function (key, val) {
                    html += '<tr>' +
                        '<td>' + list[key].action + '</td>' +
                        '<td>' + list[key].points + '</td>' +
                        '<td>' + list[key].trans_time + '</td>' +
                        '</tr>'

                })

                $('#tbodyId').append(html)
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


    $('#file').on('change',function(){
        var filePath = $(this).val();         //获取到input的value，里面是文件的路径
        var fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        var src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        $('#uploadImg').prop('src',src);
    });

    $('#img').change(function() {
        var file = this.files[0];
        var r = new FileReader();
        r.readAsDataURL(file);
        $(r).load(function() {
            $("#photoImg").prop("src",this.result);
        })
    });
    var photoImg = $('#photoImg');
    var imgsObj = $('.amplifyImg img');//需要放大的图像

    showImage123(imgsObj);
    showImage123(photoImg);
});

function openDouyin(){
    var taskUrl = $("#taskUrl").val();
    //https://v.douyin.com/sy57or/
    window.open(taskUrl);
}

function loadMenu(url){
    $("#mainFrame").attr("src",url);
}

function showFile(){
    var imgFile = $("#file").files[0];
    var fr = new FileReader();
    fr.onload = function () {
        $("#uploadImg").src = fr.result;
    };
    // 注意要先设置回调再读取文件
    fr.readAsDaraURL(imgFile);
}

function startTask(){
    var telephone = $("#telephone").val();
    var taskType = "";
    $('#input[name="taskType"]:checked').each(function(){
        taskType += $(this).val() + ",";
    });
    $.ajax({
        async : true,
        type : "POST",
        url : "/wxTask/task/getTask.action",
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        data : {
            telephone : telephone,
            taskType : taskType
        },
        dataType : "JSON",
        success : function(data){
            if(data.code == 200){
                //保存成功，跳转至详情页面
                window.location.href = "/wxTask/task/douyinTask.action";
            }else{
                toast("获取任务失败",1000);
                return;
            }
        },
        error : function(){
            swal("系统异常！");
        }
    });
}

function imgUpload(){
    $("#file").click();
}

function submitTask(){
    var file = $("#img").val();
    if(checkParameterIsEmpty(file)){
        toast("请上传任务截图",1000);
        return;
    }
    var formData = new FormData($("#taskForm")[0]);
    $.ajax({
        url : "/wxTask/task/submitTask.action",
        type : 'POST',
        data : formData,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        async : false,
        success : function(data) {
            if(data.code == 200){
                toast("提交成功",1000);
                //保存成功，跳转至详情页面
                window.location.href = "/wxTask/dashboard/douyinPage.action";
            }else{
                toast("提交失败",1000);
                return;
            }
        }
    });
}

function cancelTask(){
    swal({
        title: "放弃确认",
        text: "由于任务视频自身异常的原因，而导致无法完成时，允许放弃任务，恶意放弃会导致封号，确认放弃该任务吗?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function(){
        $.ajax({
            async : true,
            type : "POST",
            url : "/wxTask/education/deleteEducation.action",
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            data : {
                educationId : rowId
            },
            dataType : "JSON",
            success : function(data){
                if(data.result == true){
                    //保存成功，跳转至详情页面
                    swal("删除成功");
                    datatable.api().ajax.reload();
                }else{
                    swal("删除失败！");
                }
            },
            error : function(){
                swal("系统异常！");
            }
        });
    });
}

//检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter){
    if(parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined){
        return true;
    }else{
        return false;
    }
}
/* $("#menuHtml").load("menu.jsp"); */
