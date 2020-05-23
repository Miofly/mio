jQuery(document).ready(function ($) {

    $('#dataTable').bootstrapTable({
        url: "http://shangliang-api.51cms.net/api/task/task-list",
        method: 'post',
        ajaxOptions: {
            headers: {"Authorization": localStorage.getItem('TOKEN_KEY_SL')}
        },
        pagination: true,   //是否显示分页
        pageSize: 10,
        pageList: [15, 30, 45, 60],
        sidePagination: 'server', //分页方式：'client'客户端分页，'server'服务端分页，默认值：'client'
        queryParamsType: 'notLimit',
        uniqueId: 'id', //唯一标识字段
        paginationDetailHAlign: 'hidden',
        dataType: "JSON",
        dataField: "data",
        queryParams: function (params) {
            console.log(params)
            var temp = {
                page: params.pageNumber,
                per_page: params.pageSize,
            };
            return temp;
        },
        checkboxHeader: true,
        clickToSelect: true,
        singleSelect : false, // 设置为true将禁止多选
        columns: [
            {
                // title: '', formatter: function (value, row, index, field) {
                //     return '<input type="checkbox" name="taskId" value="' + row.id + '"/>';
                // }
           field: 'check',  checkbox: true, align: 'center', formatter: function (value, row, index) {
//                              if (row.check == true) {
//                                  //设置选中
//                                  return {  checked: true };
//                              }
                },width:'54px',


            },
            {field: 'id', title: '编号', align: 'center'},
            {field: 'title', title: '标题', align: 'center'},
            {field: 'programme_name', title: '方案名称', align: 'center'},
            {
                field: 'total_uv', title: '浏览量', align: 'center',
                formatter: function (value, row, index, field) {
                    var show = row.true_total_uv + "/" + row.total_uv;
                    return show;
                }
            },
            {field: 'created_at', title: '发布时间', align: 'center'}
        ],
        responseHandler: function (data) {
            console.log(data)
            if (data.code == 200) {
                return {
                    total : data.data.list.total, //总页数,前面的key必须为"total"
                    data: data.data.list.data //行数据，前面的key要与之前设置的dataField的值一致.
                };
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

        // onLoadSuccess: function (data) {
        //     if (data.code == 200) {
        //         $('#dataTable').bootstrapTable('load', data.data.list.data);
        //
        //
        //     } else {
        //         toast(data.message, 1000);
        //         setTimeout(() => {
        //             if (data.code == 403) {
        //                 window.location.href = './login.html'
        //             }
        //         }, 1000)
        //         return;
        //     }
        //     $("#selectAll").prop("checked", false);
        // },

    });
});

function doView() {
    var taskId = $("#dataTable").bootstrapTable('getSelections')

    if (taskId.length == 0) {

        toast("请选择一个任务", 1000);
        return;
    }
    if (taskId.length > 1) {
        toast("任务详情至多选择一个任务", 1000);
        return;
    }
    localStorage.setItem('TASK_ID', taskId[0].id)
    window.location.href = `./taskListDetail.html`

    // $.ajax({
    //     async: true,
    //     type: "POST",
    //     url: "http://shangliang-api.51cms.net/api/task/task-info",
    //     contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //     dataType: "JSON",
    //     data: {
    //         id: taskId[0].id
    //     },
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
    //     },
    //     success: function (data) {
    //         if (data.code == 200) {
    //             // toast(data.message, 1000);
    //             console.log(data.data)
    //             setTimeout(() => {


                // }, 1000)
        //     } else {
        //         toast(data.message, 1000);
        //         swal.close();
        //         setTimeout(() => {
        //             if (data.code == 403) {
        //                 window.location.href = './login.html'
        //             }
        //         }, 1000)
        //         return;
        //     }
        // },
        // error: function () {
        //     toast("系统异常！", 1000);
        // }
    // });

    // window.location.href = "taskDetail.html?taskId=" + taskId;
    /* var value=[];
    $('input[name="taskId"]:checked').each(function(){
        value.push($(this).val());
    });
    if(value.length > 1 || value.length == 0){
        toast("请选择一个任务",1000);
        return;
    }
    var taskId = value[0];
    window.location.href = "/wxTask/vxreadtask/taskDetail.action?taskId="+taskId; */
}

function selectAll() {
    var flag = $("#selectAll").prop("checked");
    if (flag) {
        $('input[name="taskId"]').each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $('input[name="taskId"]').each(function () {
            $(this).prop("checked", false);
        });
    }
}

function operateTask(flag) {
    var taskId = $("#dataTable").bootstrapTable('getSelections')
    var arr = []
    for (let i = 0; i < taskId.length; i++) {
        arr.push(taskId[i].id)
    }

    var arrStr = arr.join(',')
    console.log(arrStr)
    if (taskId.length == 0) {

        toast("请选择一个任务", 1000);
        return;
    }
    var title = "删除任务确认";
    var message = "确认删除选中的任务吗?";

    console.log(taskId)
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
        $(".confirm").prop("disabled", true);
        $.ajax({
            async: true,
            type: "POST",
            url: "http://shangliang-api.51cms.net/api/task/task-del",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                id: arrStr,
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
            },
            dataType: "JSON",
            success: function (data) {
                if (data.code == 200) {
                    swal.close();
                    //保存成功，跳转至详情页面
                    toast("操作成功", 1000);
                    window.location.reload();
                } else {
                    swal.close();
                    toast(data.message, 1000);
                    if (data.code == 403) {
                        setTimeout(() => {
                            window.location.href = './login.html'
                        }, 2000)
                    }
                    return;
                }
            },
            error: function () {
                swal("系统异常！");
            }
        });
    });
    /* var value=[];
    $('input[name="taskId"]:checked').each(function(){
        value.push($(this).val());
    });
    if(value.length == 0){
        toast("请至少选择一个任务",1000);
        return;
    }
    var title = "删除任务确认";
    var message = "确认删除选中的任务吗?";
    swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function(){
        $(".confirm").prop("disabled",true);
        $.ajax({
            async : true,
            type : "POST",
            url : "/wxTask/vxreadtask/operateTask.action",
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            data : {
                taskId : value,
                flag : 'delete'
            },
            dataType : "JSON",
            success : function(data){
                if(data.code == 200){
                    swal.close();
                    //保存成功，跳转至详情页面
                    toast("操作成功",1000);
                    window.location.reload();
                }else{
                    swal.close();
                    toast(data.message,1000);
                    return;
                }
            },
            error : function(){
                swal("系统异常！");
            }
        });
    }); */
}

//检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter) {
    if (parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined) {
        return true;
    } else {
        return false;
    }
}
