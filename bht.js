(function($) {
	$.fn.formInit = function(b) {
		// 获取路径参数type
		var type = GetQueryString('type')
		console.log(type)
		$.get('bht.json',function(data) {
			console.log(data[type])
			if (type && data[type]) {
				initForm(data[type])
			}else{
				var option = '<option value="">请选择功能</option>'
				for ( var i in data) {
					option += '<option value=' + i +'>'+data[i].title+'</option>'
				}
				$('#selectFuc').append(option).end()
				$('#selectFucModal').modal('show')
				$('#selectFucModal').on('hidden.bs.modal', function () {
					console.log('选择的功能：'+$('#selectFuc option:selected').val())
					let t = $('#selectFuc option:selected').val()
					let url = location.href
					console.log(url.substring(0,url.indexOf("?")))
					location.replace(url.substring(0,url.indexOf("?"))+'?type='+t) 
				});
			}
		}).error(function(xhr, status, info) {
			alert('bht.json文件数据加载失败，请检查')
		})
	}
	
	function initForm(formdata){
		var form = document.getElementById("R01")
		$(form).attr('action', formdata['action'])
		let html = ''
		var title = '<h2 class="text-center">'
				+ formdata['title'] + '</h2><br>'
		html += title
		var params = formdata['params']
		for (let i = 0; i < params.length; i++) {
			if (params[i]['type'] == "SELECT") {
				var childs = params[i]['childs']
				var opts = ''
				for (let ii = 0; ii < childs.length; ii++) {
					var option = '<option value="'
							+ childs[ii]['value'] + '"'
							+ childs[ii]['idSelected']
							+ '>' + childs[ii]['title']
							+ '</option>'
					opts += option
				}
				var sel = '<div class="form-group"><label class="col-sm-4 control-label">'
						+ params[i]['title']
						+ '</label><div class="col-sm-4"><select name="'
						+ params[i]['name']
						+ '" class="form-control">'
						+ opts
						+ '</select></div></div>'
				html += sel
			} else if (params[i]['type'] == 'RADIO') {

			} else {// 默认TEXT类型
				var text = '<div class="form-group"><label class="col-sm-4 control-label">'
						+ params[i]['title']
						+ '</label><div class="col-sm-4"><input name="'
						+ params[i]['name']
						+ '" type="text" class="form-control" value="'
						+ params[i]['defaultValue']
						+ '" '
						+ params[i]['isMust']
						+ '/>'
						+ params[i]['desc']
						+ '</div></div>';
				html += text
			}
		}
		// 添加分账信息
		if (formdata['hasSplit']) {
			$('.class-splitInfo').removeClass('sr-only')
		}else{
			$('.class-splitInfo').remove();
		}
		$('.fieldInfo').html(html)
	}
	
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURI(r[2]);
		return null;
	}
	// 提交
	$("#R01").submit(
			function(e) {
				var len = $("#splitInfo tr").length
				console.log(len)
				var info = [];
				for (var i = 0; i < len; i++) {
					var obj = {};
					obj.contractNo = $("#splitInfo tr").eq(i).children("td")
							.eq(0).children("input").val();
					obj.customerType = $("#splitInfo tr").eq(i).children("td")
							.eq(1).children("select").val();
					obj.splitAmount = $("#splitInfo tr").eq(i).children("td")
							.eq(2).children("input").val();
					obj.sellerFlag = $("#splitInfo tr").eq(i).children("td")
							.eq(3).children("select").val();
					info.push(obj);
				}
				$("#SplitInfoList").val(JSON.stringify(info))
			});
	// 添加分账
	if (document.getElementById("class-splitInfo") != null) {
		console.log('添加分账详情')
		var table = "<div class=\"col-sm-2\"><input name=\"SplitInfoList\" id=\"SplitInfoList\" type=\"hidden\" /></div>"
				+ "<div class=\"col-sm-8\"><table class=\"table table-bordered\"><caption>分账信息详情</caption>"
				+ "<thead><tr class=\"success\"><th>客户账户号</th><th>客户类型</th><th>分账金额(分)</th><th>卖家标识</th>"
				+ "<th><button type=\"button\" class=\"btn btn-primary add\" id=\"add\" >新增</button></th></tr></thead>"
				+ "<tbody id=\"splitInfo\"><tr><td><input class=\"form-control\" type=\"text\" value=\"100026136\"></td>"
				+ "<td><select class=\"form-control\"><option value=\"ORG\" selected=\"selected\">机构/平台</option>"
				+ "<option value=\"PERSON\">个人账户</option><option value=\"B_ACCOUNT\">B端账户</option></select></td>"
				+ "<td><input type=\"text\" class=\"form-control\" value=\"500\"></td>"
				+ "<td><select class=\"form-control\"><option value=\"1\" selected=\"selected\">卖家</option> <option value=\"0\">买家</option></select></td>"
				+ "<td><button type=\"button\" class=\"btn btn-warning remove\">删除</button></td></tr>"
				+ "<tr><td><input class=\"form-control\" type=\"text\" value=\"3177000003328497\"></td>"
				+ "<td><select class=\"form-control\"><option value=\"ORG\">机构/平台</option> <option value=\"PERSON\"  selected=\"selected\">个人账户</option>"
				+ "<option value=\"B_ACCOUNT\">B端账户</option></select></td>"
				+ "<td><input type=\"text\" class=\"form-control\" value=\"500\"></td>"
				+ "<td><select class=\"form-control\"><option value=\"1\">卖家</option><option value=\"0\" selected=\"selected\">买家</option></select></td>"
				+ "<td><button type=\"button\" class=\"btn btn-warning remove\">删除</button></td></tr>"
				+ "</tbody></table></div>";
		document.getElementById("class-splitInfo").innerHTML = table
	}

	// 增加行
	$('.add')
			.click(
					function(e) {
						console.log('增加分账信息')
						var tr_con = "<tr> <td><input type=\"text\" class=\"form-control\"> </td>"
								+ " <td> <select class=\"form-control\"><option value='ORG'>机构/平台</option><option value='PERSON'>个人账户</option><option value='B_ACCOUNT'>B端账户</option></select></td> "
								+ "<td><input type=\"text\" class=\"form-control\"></td>"
								+ " <td> <select class=\"form-control\"><option value='1'>卖家</option><option value='0'>买家</option></select></td> "
								+ "<td><button type=\"button\" class=\"btn btn-warning remove\">删除</button></td>"
								+ "</tr> ";
						$("#splitInfo").append(tr_con);
					});

	// 删除行
	$(document).on('click', '.remove', function(e) {
		$(this).parent().parent().remove();
	})

	// 左侧导航
	$.fn.menu = function(b) {
		var c, item, httpAdress;
		b = jQuery.extend({
			Speed : 220,
			autostart : 1,
			autohide : 1
		}, b);
		c = $(this);
		item = c.children("ul").parent("li").children("a");
		httpAdress = window.location;
		item.addClass("inactive");
		function _item() {
			var a = $(this);
			if (b.autohide) {
				a.parent().parent().find(".active").parent("li").children("ul")
						.slideUp(
								b.Speed / 1.2,
								function() {
									$(this).parent("li").children("a")
											.removeAttr("class");
									$(this).parent("li").children("a").attr(
											"class", "inactive")
								})
			}
			if (a.attr("class") == "inactive") {
				a.parent("li").children("ul").slideDown(b.Speed, function() {
					a.removeAttr("class");
					a.addClass("active")
				})
			}
			if (a.attr("class") == "active") {
				a.removeAttr("class");
				a.addClass("inactive");
				a.parent("li").children("ul").slideUp(b.Speed)
			}
		}
		item.unbind('click').click(_item);
		if (b.autostart) {
			c.children("a").each(
					function() {
						if (this.href == httpAdress) {
							$(this).parent("li").parent("ul").slideDown(
									b.Speed,
									function() {
										$(this).parent("li").children(
												".inactive")
												.removeAttr("class");
										$(this).parent("li").children("a")
												.addClass("active")
									})
						}
					})
		}
	}

})(jQuery);
