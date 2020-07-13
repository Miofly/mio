<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php echo TITLE;?>-负载均衡管理</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<meta content="email=no" name="format-detection" />
	<link rel="stylesheet" href="<?=get_static('datepicker/css/datepicker.css')?>">
	<style>
    		.tooltiptext {
    			visibility: visible;
    			width: 120px;
    			background-color: #1397dc;
    			color: #fff;
    			text-align: center;
    			border-radius: 6px;
    			padding: 5px 0;
    			position: absolute;
    		}

    		.tooltiptext::after {
    			content: "";
    			position: absolute;
    			top: 100%;
    			left: 50%;
    			margin-left: -5px;
    			border-width: 5px;
    			border-style: solid;
    			border-color: #1397dc transparent transparent transparent;
    		}
    	</style>
</head>
<body>
	<!-- header -->
  	<?php include_once ADMIN_PATH .'view/public/header.php';?>

	<!-- left -->
	<?php include_once ADMIN_PATH .'view/public/left.php';?>
	<style type="text/css">
		input:disabled,select:disabled,textarea:disabled{
			color: #a2a2a2;
            background: #fff;
		}
		.delet_icon1:hover,.revise_icon1:hover{cursor: pointer;}
		.revise_disabled:hover{cursor: default;background: none;border: 1px solid #ddd;}
	</style>
	<!-- right -->
	<div class="mainright">
		<div class="right_con">
			<div class="right_title">
				<span><a href="slb.php">阿里云负载均衡</a></span>
				<span ><a  class="tooltiptext"  href="txslb.php">腾讯云负载均衡</a></span>
			</div>
			<div class="right_search">
                <form id='timeform' method="get" action="txslb.php" style="display: flex;">
                    <select name='resource_group_id' style="width:100px;height:34px;">
                        <option value='-1'>选择资源组</option>
                        <?php foreach($resource_group_arr as $key => $value):?>
                            <option value='<?=$value['ResourceGroupId']?>' <?php if($resource_group_id == $value['ResourceGroupId']):?>selected="selected"<?php endif;?>/><?=$value['ResourceGroupName']?></option>
                        <?php endforeach;?>
                    </select>
                    &nbsp;&nbsp;
                    <select name='region_id' style="width:100px;height:34px;">
                        <option value='0'>选择地域</option>
                        <?php foreach($regions_arr as $key => $value):?>
                            <option value='<?=$value['RegionId']?>' <?php if($region_id == $value['RegionId']):?>selected="selected"<?php endif;?>/><?=$value['RegionName']?></option>
                        <?php endforeach;?>
                    </select>
                    &nbsp;&nbsp;

                    <button type="submit" class="btn sure" style="height:34px;line-height:34px;">查询</button>
                </form>
                <div style="float: right;">
                    <a href="slb.php?a=ping_and_bug"><button type="button" class="btn sure" style="height:34px;line-height:34px;">域名监听</button></a>
                </div>
            </div>
			<div class="right_table">
				<table cellpadding="0" cellspacing="0" class="table_style">
					<thead>
						<tr>
							<th>序号</th>
							<th>实例名称</th>
							<th>IP地址</th>
                            <th>端口</th>
                            <th>状态</th>
                            <th>项目组</th>
                            <th>地域</th>
							<th>后端服务器</th>
							<th>购买时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<?php if($lists):?>
					<tbody>
                    <?php $i = 1; ?>
						<?php foreach($lists as $key => $value):?>
						<tr style="<?=$value['LoadBalancerStatus'] != 1 ? 'color:#a2a2a2;' : ''?>">
							<td align="center"><?=$i++?></td>
							<td align="center"><?=$value['name']?></td>
							<td align="center" id="ping<?=$value['id']?>" port="<?=$value['LoadBalancerPort']?>"><?=$value['ip']?></td>
							<td align="center"><?=$value['LoadBalancerPort']?></td>
                            <td align="center"><?=$status_arr[$value['LoadBalancerStatus']]?></td>
                            <td align="center"><?=$value['ResourceGroupName']?></td>
                            <td align="center"><?=$value['RegionName']?></td>
                            <td align="center" style = "max-width:600px"><?=$value['server']?></td>
							<td align="center"><?=date('Y-m-d H:i:s',$value['addtime'])?></td>
							<td align="center">
								<!-- <input onClick="setstatus('<?=$value['id'];?>', <?=$value['LoadBalancerStatus']?>, '<?=$value['name'].'-'.$value['ip']?>','<?=$value['RegionId']?>')"  type="button" <?php if($value['LoadBalancerStatus'] == 1):?>class="revise_icon1" value="停止"<?php else:?>class="revise_icon1" value="启动"<?php endif;?>/> -->
								<input onClick="slbClone('<?=$value['ip'];?>', '<?=$value['name'].'-'.$value['ip']?>')" type="button"  class="revise_icon1" value="克隆"/>
                                <input onClick="edit('<?=$value['id'];?>')" type="button"  class="delet_icon1" value="编辑"/>
								<input onClick="del(this, '<?=$value['id'];?>', '<?=$value['name'].'-'.$value['ip']?>')" type="button"  class="delet_icon1" value="释放"/>
							</td>
						</tr>
						<?php endforeach;?>
					</tbody>
					<?php endif;?>
				</table>
				<div style="width: 100%; ">
					<button type="button" onClick="add()" class="btn sure">购买SLB</button>
					<button type="button" onClick="peizhi()" class="btn sure">配置</button>
					<button type="button" onClick="getSlbList(this)" class="btn sure">更新列表</button>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript">
	function setstatus(id, status, str, regionId){
		var msg = '';
		if(status == 2){
		    status2 = 1;
			msg = '确认启动'+ (str ? "(<span style='color:red;'>"+str+"</span>)" : '') +'？';
		}else{
		    status2 = 2;
			msg = '确认停止'+ (str ? "(<span style='color:red;'>"+str+"</span>)" : '') +'？';
		}

		layer.confirm(msg, function(){
			$.post('txslb.php?a=able', {id:id,status:status2,regionId:regionId}, function(res){
				layer.msg(res.msg);
				if(res.code){
					setTimeout(function(){location.reload();}, 1500);
				}
			},'json');
		});
	}

	function del(obj, id, str){
		layer.confirm("确认删除(<span style='color:red;'>"+str+"</span>)？", function(){
		    $.post('txslb.php?action=del', {id:id}, function(res){
		    	layer.msg(res.msg);
				if(res.code){
					$(obj).closest('tr').remove();
				}
		    },'json');
		});
	}
	//克隆slb
    function slbClone(ip,str){
        layer.confirm("确认克隆(<span style='color:red;'>"+str+"</span>)？", function(){
            $.ajax({
                url:'txslb.php?a=slb_clone',
                dataType:'json',
                type:'POST',
                data:{ip:ip},
                async:false,
                success:function(res){
                    layer.msg(res.msg);
                    if(res.code){
                        setTimeout(function(){location.reload();}, 1500);
                    }
                }
            });
        });
    }

    function getServerList(RegionId){
	    var returnNum = 1;
        $.ajax({
            url:'txslb.php?a=getServerList',
            dataType:'json',
            type:'get',
            data:{RegionId:RegionId},
            async:false,
            success:function(res){
                layer.msg(res.msg);
                if(res.code){
                    var html = '';
                    $.each(res.data, function(k,v){
                        html += '<div style="width: 50%; height: 40px;overflow: hidden;white-space: nowrap;">'+
                            '<input type="checkbox" serverid="'+v.ServerId+'"  name="server" value="'+ v.id +'">&nbsp;'+v.name+
                            '</div>';
                    });
                    $("#serverListDiv").html(html);
                } else{
                    $("#serverListDiv").html('');
                }
            }
        });
        return returnNum;
    }

	function getSlbList(obj){
		//layer.confirm('确认更新负载均衡列表？', function(){
			$(obj).attr('disabled', true);
			$.get('txslb.php?a=getSlbList',function(res){
				$(obj).attr('disabled', false);
				layer.msg(res.msg);
				if(res.code){
					setTimeout(function(){location.reload();}, 1500);
				}
			},'json');
		//});
	}

	ping();
	function ping(){
		$('td[id^=ping]').each(function(v){
			var obj = $(this);
			var port = obj.attr('port').split(';');
			var ip = obj.text()+':'+port[0];

			if(obj.closest('tr').attr('style') == ''){
				jsping(ip, function(res){
				    if(res){
				    	obj.css("color", '#5bcd52');
				    }else{
				    	obj.css("color", 'red');
				    }
				});
			}
		});
	}

	function jsping(ip, callback){
	    var istimeout = false;
	    var xhr = new XMLHttpRequest()
	    xhr.onreadyStateChange = function () {

	    }
	    xhr.open('get', 'http://'+ip, true)
	    xhr.timeout = 3000;
	    xhr.ontimeout = function () {
	        callback(false);
	        istimeout = true;
	    }
	    xhr.send(null);
	    setTimeout(function(){!istimeout && callback(true);}, 3000);
	}
</script>

<!-- 弹出层:购买 -->
<div class="popdiv" id="wx1_popdiv">
	<div class="popdivYm" id="wx1_popdivYm">
		<div class="popdiv_title"><span>创建负载均衡</span><a href="javascript:;" class="close_popdiv closeDIV icon"></a></div>
		<div class="popdiv_con">
			<input type="hidden" id="id" name="id" value="">

			<div class="infor_list"  style="width: 50%;float:left;">
				<div class="fl popdiv_bt" style="width: 30%;">SLB名称：</div>
				<div class="fl" style="width: 70%;"><input type="text" id="name" name='name' class="input_box textbox"  value="" style="width: 100%;box-sizing: border-box;"></div>
				<div class="clearfix"></div>
			</div>

			<div class="infor_list"  style="width: 45%;float:right;">
				<div class="fl popdiv_bt" style="width: 40%;">监听端口：</div>
				<div class="fl"  style="width: 60%;"><input type="text" id="LoadBalancerPort" placeholder="多个请用 ; 隔开" name='LoadBalancerPort' class="input_box textbox" style="width: 100%;box-sizing: border-box;" value=""></div>
				<div class="clearfix"></div>
			</div>

            <div class="infor_list"  style="width: 50%;float:left;">
                <div class="fl popdiv_bt" style="width: 30%;">项目组：</div>
                <div class="fl" style="width: 70%;">
                    <select name='resource_group_id' id='resource_group_id' class="input_box textbox" style="width:100%">
                        <?php if($resource_group_arr_new){ ?>
                        <?php foreach($resource_group_arr_new as $key => $value):?>
                            <option value='<?=$key?>' <?php if($resource_group_id == $key):?>selected="selected"<?php endif;?>/><?=$value?></option>
                        <?php endforeach;?>
                        <?php }else{ ?>
                            <?php foreach($resource_group_arr as $key => $value):?>
                                <option value='<?=$value['ResourceGroupId']?>' <?php if($resource_group_id == $value['ResourceGroupId']):?>selected="selected"<?php endif;?>/><?=$value['ResourceGroupName']?></option>
                            <?php endforeach;?>
                        <?php } ?>
                    </select>
                </div>
                <div class="clearfix"></div>
            </div>

            <div class="infor_list"  style="width: 45%;float:right;">
                <div class="fl popdiv_bt" style="width: 40%;">地域：</div>
                <div class="fl"  style="width: 60%;">
                    <select name='region_id' id='region_id' class="input_box textbox" style="width:100%">
                        <option value='0'>选择地域</option>
                        <?php foreach($regions_all_arr as $key => $value):?>
                            <option value='<?=$value['RegionId']?>'/><?=$value['LocalName']?></option>
                        <?php endforeach;?>
                    </select>
                </div>
                <div class="clearfix"></div>
            </div>

			<div class="infor_list">
				<div class="fl popdiv_bt" style="width: 15%;">后端CVM:</div>

				<div class="fl startUse">
					<div id="serverListDiv" style="display: flex;flex: 1; flex-wrap: wrap;width: 400px;height:350px;overflow-y:auto;">
					</div>
				</div>
				<div class="clearfix"></div>
			</div>

			<div class="infor_list">
				<div class="fl popdiv_bt"  style="width: 100px;"></div>
				<div >
					<button id="btn_submit" type="button" onclick="save()" class="btn sure">确定</button>
					<button type="button" class="btn cancel closeDIV">取消</button>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	function add(){
		$("#wx1_popdiv").css({"width":"100%","height":"100%","opacity":"1"});
		$("#wx1_popdivYm").show();
        $('.popdiv_title').find("span").html('创建负载均衡');
		$('#id').val('');
		$('#name').val('');
		$('#resource_group_id').val(0).attr('disabled',false);
		$('#region_id').val(0).attr('disabled',false);
		$('#LoadBalancerPort').val('80');
		$('input[name=server]').prop('checked', false);
	}

	function edit(id){
		$("#wx1_popdiv").css({"width":"100%","height":"100%","opacity":"1"});
		$("#wx1_popdivYm").show();
		$('.popdiv_title').find("span").html('编辑负载均衡');

		$.post('txslb.php?action=detail', {id:id}, function(res){
			$('#id').val(id);
			$('#name').val(res.data.name);
			$('#resource_group_id').val(res.data.ResourceGroupId).attr('disabled',true);
			$('#region_id').val(res.data.RegionId).attr('disabled',true);
			$('#LoadBalancerPort').val(res.data.LoadBalancerPort);
            $("#serverListDiv").html('');
            var flag = getServerList(res.data.RegionId);
            if(flag){
                $('input[name=server]').prop('checked', false);
                $.each(res.server, function(k,v){
                    $('input[serverid='+v+']').prop('checked', true);
                });
            }
        }, 'json');
	}
	function save(){
		var id = $('#id').val();
		var name = $('#name').val();
		var RegionId = $('#region_id').val();
		var ResourceGroupId = $('#resource_group_id').val();
		var LoadBalancerPort = $('#LoadBalancerPort').val();
		var server = [];
		$('input:checkbox[name=server]:checked').each(function(k){
		    server.push($(this).val());
		})
		$('#btn_submit').attr('disabled', true);
		$.post('txslb.php?action=save', {id:id,name:name,server:server,LoadBalancerPort:LoadBalancerPort,RegionId:RegionId,ResourceGroupId:ResourceGroupId}, function(res){
			layer.msg(res.msg);
			$('#btn_submit').attr('disabled', false);
			if(res.code){
				setTimeout(function(){location.reload()}, 1500);
			}
	    },'json');
	}

    $("#region_id").change(function(){
        var RegionId = $('#region_id').val()
        getServerList(RegionId);
    });

    function getProjectList(){
    	$.post('txslb.php?a=getProjectList',function(res){

    	}, 'json');
    }
</script>

<!-- 弹出层:配置 -->
<div class="popdiv" id="wx2_popdiv">
	<div class="popdivYm" id="wx2_popdivYm">
		<div class="popdiv_title"><span>配置</span><a href="javascript:;" class="close_popdiv closeDIV icon"></a></div>
		<div class="popdiv_con">
			<div class="infor_list">
				<div class="fl popdiv_bt" style="width:150px;">ACCESS_ID：</div>
				<div class="fl"><input id="txoss_access_id" name="txoss_access_id" type="text" value="<?=$txoss_access_id?>" class="input_box textbox" style="width: 270px;"></div>
				<div class="clearfix"></div>
			</div>

			<div class="infor_list">
				<div class="fl popdiv_bt" style="width:150px;">ACCESS_KEY：</div>
				<div class="fl"><input id="txoss_access_key" name="txoss_access_key" type="text" value="<?=$txoss_access_key?>" class="input_box textbox" style="width: 270px;"></div>
				<div class="clearfix"></div>
			</div>

			<div class="infor_list">
				<div class="fl popdiv_bt" style="width:150px;">ACCESS_KEY有效期：</div>
				<div class="fl"><input id="txoss_access_hour" name="txoss_access_hour" placeholder="单位（小时）" type="text" value="<?=$txoss_access_hour?>" class="input_box textbox" style="width: 270px;"></div>
				<div class="clearfix"></div>
			</div>

<!--             <div class="infor_list">
                <div class="fl popdiv_bt" style="width:150px;">备注资源组：</div>
                <div class="fl">
                    <textarea id="resource_group" style="width:270px;height:200px;" class="input_box  wxtextbox"><?=json_decode($sys_resource_group['value'])?></textarea>
                    <p class="padt8"></p>一行一个,如：默认资源组#0
                </div>
                <div class="clearfix"></div>
            </div> -->

			<div class="infor_list">
				<div class="fl popdiv_bt" style="width:150px;"></div>
				<div >
					<button id="btn_submit" type="button" onclick="savepeizhi()" class="btn sure">确定</button>
					<button type="button" class="btn cancel closeDIV">取消</button>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	<?php if(!$txoss_access_id || !$txoss_access_key):?>
		peizhi();
	<?php endif;?>

	function peizhi(){
		$("#wx2_popdiv").css({"width":"100%","height":"100%","opacity":"1"});
		$("#wx2_popdivYm").show();
	}

	function savepeizhi(){
		var txoss_access_id = $('#txoss_access_id').val();
		var txoss_access_key = $('#txoss_access_key').val();
		var txoss_access_hour = $('#txoss_access_hour').val();
		var resource_group = $('#resource_group').val();

		$.post('txslb.php?action=savepeizhi', {txoss_access_id:txoss_access_id,txoss_access_key:txoss_access_key,txoss_access_hour:txoss_access_hour,resource_group:resource_group}, function(res){
			layer.msg(res.msg);
			if(res.code){
				setTimeout(function(){location.reload()}, 1500);
			}
	    },'json');
	}
</script>

</body>
</html>