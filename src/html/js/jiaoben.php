<?php
$referer = $_SERVER["HTTP_REFERER"];
$referer = parse_url($referer);
if(isset($referer['query'])){
    $params = convertUrlQuery($referer['query']);
}

function convertUrlQuery($query)
{
    $queryParts = explode('&', $query);
    $params = array();
    foreach ($queryParts as $param) {
        $item = explode('=', $param);
        $params[$item[0]] = isset($item[1]) ? $item[1] : '';
    }
    return $params;
}

$randNum_dc = rand(0,100);

?>

var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
        location.href="http://qq.com"
    }

<?php /*程序总统计*/ ?>
	var _hmt = _hmt || [];
	(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?bb335ebd41354e7a91192fd374a3146b";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
	})();

<?php /*列变量*/
if ((isset($params['from']))): ?>
    var _hmt = _hmt || [];
    (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?e0a28399ea00ea55b351e14435be3ef6";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })();
<?php endif; ?>

<!--加载快转内页百度统计-->
<?php
if ((isset($params['uuid']) && $params['uuid'] == 'f02d587f-8064-476a-bde0-656da8ad7218')): ?>
    var _hmt = _hmt || [];
    (function () {
    var hm5 = document.createElement("script");
    hm5.src = "https://hm.baidu.com/hm.js?748e31ca53d09d54a7e8078524841c57";
    var s5 = document.getElementsByTagName("script")[0];
    s5.parentNode.insertBefore(hm5, s5);
    })();
<?php endif; ?>
<!--加载快转退弹百度统计-->
<?php
if ((isset($params['uuid']) && $params['uuid'] == '52fa0434-e7ce-40e2-80e0-81a35fe0762a')): ?>
    var _hmt = _hmt || [];
    (function () {
    var hm8 = document.createElement("script");
    hm8.src = "https://hm.baidu.com/hm.js?ed0dbc0f70074b25069238969a43b8b5";
    var s8 = document.getElementsByTagName("script")[0];
    s8.parentNode.insertBefore(hm8, s8);
    })();
<?php endif; ?>
<!--加载产品二部退弹(爱点转)百度统计-->
<?php
if ((isset($params['uuid']) && $params['uuid'] == '9a0b75b3-a4a8-41a4-94f4-e75869e59746')): ?>
    var _hmt = _hmt || [];
    (function () {
    var hm6 = document.createElement("script");
    hm6.src = "https://hm.baidu.com/hm.js?acf24f8cf3c9913fda8517576fa5fc21";
    var s6 = document.getElementsByTagName("script")[0];
    s6.parentNode.insertBefore(hm6, s6);
    })();
<?php endif; ?>
<!--加载产品一部退弹百度统计-->
<?php
if ((isset($params['uuid']) && $params['uuid'] == '6604233f-1544-4815-8556-56991cea07f')): ?>
    var _hmt = _hmt || [];
    (function () {
    var hm7 = document.createElement("script");
    hm7.src = "https://hm.baidu.com/hm.js?3df34d884a39d9fe485134caf78a3802";
    var s7 = document.getElementsByTagName("script")[0];
    s7.parentNode.insertBefore(hm7, s7);
    })();
<?php endif; ?>

<?php /*启动中台计费+裂变率*/
if (isset($params['uuid']) && (isset($params['from']) )) { ?>
    var url = "https://1201025296535677.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/new_lz_lb/new_lz_lb/?uuid=<?= $params['uuid'] ?>";
    var xml = new XMLHttpRequest;
    xml.open("GET",url,true);
    xml.send(null);
<?php } elseif (isset($params['uuid'])) { ?>
    var hm = document.createElement("script");
    hm.src = "https://start-up-shanghai.oss-cn-shanghai.aliyuncs.com/j.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
<?php  } ?>
