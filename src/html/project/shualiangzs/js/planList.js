jQuery(document).ready(function($) {
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
                var list = data.data.list
                console.log(list)
                var html = ''
                $.each(list, function (key, val) {
                    html += '<tr onclick="tzDetail('+ list[key].id +')">' +
                        '<td>' + list[key].id + '</td>' +
                        '<td>' + list[key].name + '</td>' +
                        '<td>' + list[key].total_uv + '</td>' +
                        '<td>' + list[key].created_at + '</td>' +
                        '</tr>'

                })

                $('#tbodyId').append(html)
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

function tzDetail(id) {
    localStorage.setItem('PLAN_ID', id)
    window.location.href = `./vxreadConfigDetail.html`
}

function addPlan(){
    window.location.href = "vxreadConfigAdd.html";
}

//检查值是否为空；空：返回true；不为空返回false
function checkParameterIsEmpty(parameter){
    if(parameter == null || parameter == "null" || parameter == "" || parameter == "undefined" || parameter == undefined){
        return true;
    }else{
        return false;
    }
}
