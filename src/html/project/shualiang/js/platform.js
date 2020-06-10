$(function () {
    $.ajax({
        async: true,
        type: "POST",
        url: "http://api.51sld.cn/index-product-list",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('TOKEN_KEY_SL'));
        },
        success: function (data) {
            if (data.code == 200) {
                var list = data.data.list
                var length = Math.ceil(list.length / 4)

                for (let i = 0; i < length; i++) {
                    var html,html1,html2,html3,html4,html5,html6,html7,html8,
                        html9,html10,html11,html12,html13,html14,html15,html16,
                        html17,html18,html19,html20,html21,html22,html23,html24,
                        html25,html26,html27,html28,html29,html30,html31,html32

                    var tr = document.createElement("tr");
                    tr.id = "mytr" + i;
                    $('#platform').append(tr);

                    var mylist = list.slice(i * 4, (i + 1) * 4)
                    // if (i == 0) {
                    listHtml(mylist, html + i, i)
                    // }
                    // if (i == 1) {
                    //     listHtml(mylist, html1, i)
                    // }


                }

                function listHtml(mylist, html1, i) {
                    $.each(mylist, function (key, val) {
                        html1 += '<td><font color="red">' + mylist[key].product_name + '</font></td>\n' +
                            '<td><a target="_blank" \n' +
                            '   href=' + mylist[key].download_url + '>\n' +
                            '<font color="blue">点击下载</font></a>\n' +
                            '</td>'
                    })
                    $('#mytr' + i).append(html1)
                }
                // for (let i = 0; i < length; i++) {
                //     var html
                //
                //     $('#platform1').append(html)
                // }



                // var html1 = ''
                // console.log(list.slice(4,8))
                // $.each(list.slice(4,8), function (key, val) {
                //     // html += '<td class="announcement" style="color:red;padding-left: 120px">'+ list[key].content + '</td>'
                //     html1 += '<td><font color="red">'+ list.slice(4,8)[key].product_name + '</font></td>\n' +
                //         '<td><a target="_blank" \n' +
                //         '   href='+ list.slice(4,8)[key].download_url +'>\n' +
                //         '<font color="blue">点击下载</font></a>\n' +
                //         '</td>'
                // })
                // $('#platform2').append(html1)

            } else {
                toast(data.message, 1000);
                // setTimeout(() => {
                //     if (data.code == 403) {
                //         window.location.href = 'login.html'
                //     }
                // }, 1000)
                return;
            }
        },
        error: function () {
            toast("系统异常！", 1000);
        }
    });
})
