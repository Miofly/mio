//自定义弹框
function toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width:80%; min-width:150px; background:#000; opacity:0.5; height:42px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:40%; left:10%; z-index:999999; font-weight:bold;font-size: 18px";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}

function showImage123(imgsObj){
	if(imgsObj){
	    $.each(imgsObj,function(){
	        $(this).click(function(){
	            var currImg = $(this);
	            coverLayer(1);
	            var tempContainer = $('<div class=tempContainer></div>');//图片容器
	            with(tempContainer){//width方法等同于$(this)
	                appendTo("body");
	                var windowWidth=$(window).width();
	                var windowHeight=$(window).height();
	                //获取图片原始宽度、高度
	                var orignImg = new Image();
	                orignImg.src =currImg.attr("src") ;
	                var currImgWidth= orignImg.width;
	                var currImgHeight = orignImg.height;
	                if(currImgWidth<windowWidth){//为了让图片不失真，当图片宽度较小的时候，保留原图
	                    if(currImgHeight<windowHeight){
	                        var topHeight=(windowHeight-currImgHeight)/2;
	                        if(topHeight>35){/*此处为了使图片高度上居中显示在整个手机屏幕中：因为在android,ios的微信中会有一个title导航，35为title导航的高度*/
	                            topHeight=topHeight-35;
	                            css('top',topHeight);
	                        }else{
	                            css('top',0);
	                        }
	                        html('<img border=0 src=' + currImg.attr('src') + '>');
	                    }else{
	                        css('top',0);
	                        html('<img border=0 src=' + currImg.attr('src') + ' height='+windowHeight+'>');
	                    }
	                }else{
	                    var currImgChangeHeight=(currImgHeight*windowWidth)/currImgWidth;
	                    if(currImgChangeHeight<windowHeight){
	                        var topHeight=(windowHeight-currImgChangeHeight)/2;
	                        if(topHeight>35){
	                            topHeight=topHeight-35;
	                            css('top',topHeight);
	                        }else{
	                            css('top',0);
	                        }
	                        html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+';>');
	                    }else{
	                        css('top',0);
	                        html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+'; height='+windowHeight+'>');
	                    }
	                }
	            }
	            tempContainer.click(function(){
	                $(this).remove();
	                coverLayer(0);
	            });
	        });
	    });
	}
	else{
	    return false;
	}
}

//使用禁用蒙层效果
function coverLayer(tag){
    with($('.over')){
        if(tag==1){
            css('height',$(document).height());
            css('display','block');
            css('opacity',1);
            css("background-color","#FFFFFF");
            css("background-color","rgba(0,0,0,0.7)" );  //蒙层透明度
        }
        else{
            css('display','none');
        }
    }
}

//给原生传递数据
function openApp(url) {
  var iFrame;
  var u = navigator.userAgent;
  var isWeixin = u.toLowerCase().indexOf('micromessenger') != -1;
  if(isWeixin){
	  swal("请在浏览器种打开");
	  return;
  }
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //安卓终端使用iframe
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", url);
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
  } else if (isiOS) {
    //iOS终端直接页面跳转
    window.location.href = url;
    // 如果用户没有安装淘宝APP，则提示用户去安装淘宝
    setTimeout(() => {
        //swal('请去应用市场下载App'); // 这里可以自行写一个延时关闭的弹窗，也可以跳转至app下载地址，我这里就偷懒了
    }, 5000);
  } else {
    window.open(url);
  }
}
