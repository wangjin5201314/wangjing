$(function () {
	$('input,textarea,select').blur(function () {
		var $elm = $(this);
		if ($elm.attr('data-validata')) {
			//移除提示内容
			$elm.parent().find('.input-help').remove();
			//获取验证规则
			var $checkdata = $elm.attr('data-validata').split(',');

			//获取数据
			var $checkvalue = $elm.val();
			var $checkstate = true;
			var $checktext = "";
			if ($checkvalue != '' || $checkdata) {
				for (var i = 0; i < $checkdata.length; i++) {
					var $checktype = $checkdata[i].split(':');
					console.log($checktype);
					console.log(validata($elm, $checktype[0], $checkvalue));
					if (!validata($elm, $checktype[0], $checkvalue)) {
						$checkstate = false;
						$checktext += "<span>" + $checktype[1] + "</span>";
						break;
					}
				}
			}
			$formControl = $elm.closest('.form-control');
			if ($checkstate) {
				$formControl.removeClass('check-error');
				$elm.parent().find('.input-help').remove();
				$formControl.addClass('check-success');
			} else {
				$formControl.removeClass('check-success').addClass('check-error');
				$elm.parent().append('<div class="input-help">' + $checktext + '</div>');
			}
		}
	});
	var validata = function (element, type, value) {
		var value = value.replace(/^\s*|\s$/g, '');
		switch (type) {
			case "required":
				return value.length > 0;
				break;
			case "chinese":
				return /^[\u0391-\uFFE5]+$/g.test(value);
				break;
			case "number":
				return /^\d+$/g.test(value);
				break;
			case "english":
				return /^[A-Za-z]+$/g.test(value);
				break;
			case "username":
				return /^[A-Za-z]\w{4,}$/g.test(value);
				break;
			case "mobile":
				return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value);
				break;
			case "email":
				return /^\w+@[\w\.]+$/g.test(value);
				break;
			case "qq":
				return /^[1-9]\d{4,10}$/.test(value);
				break;
			default:
				var $test = type.split('#');
				if ($test.length > 1) {
					switch ($test[0]) {
						case "repeat":
							return (value == $('input[name=' + $test[1] + ']').eq(0).val());
							break;
						case "ajax":
							var url = $test[1] + value;
							var content = $.ajax({
								url: url,
								async: false
							}).responseText;
							if (content == 'true') {
								return true
							} else {
								return false;
							}
							break;
						case "length":
							$len = value.length;

							return eval($len + $test[1]);
							break;
					}
				}
		}
	}
	var mobile;
	var $formBox=$('.swiper-slide8 #formBox');
	$('.swiper-slide8 #formBox').submit(function () {
		$(this).find('input[data-validata],textarea[data-validata],select[data-validata]').trigger('blur');
		var errorNums = $(this).find('.check-error').length;
		if (errorNums) {
			layer.msg("请按照要求填写数据，感谢配合！", { time: 1000 })
			return false;
		}
		var params = $formBox.serialize(); //序列化表单的值
		// console.log(params)
		$.ajax({
			url: 'php/form.php?type=insert', //后台处理程序
			type: 'post',       //数据传送方式
			dataType: 'json',   //接受数据格式
			data: params,       //要传送的数据
			success: function (data) {
				console.log(data)
				if (data.code == 200) {
					layer.msg(data.msg, { time: 1000 });
					$formBox[0].reset();
					mobile=data.mobile;
				} else {
					layer.msg(data.msg, { time: 1000 })
				}
			},
			error: function () {
				layer.msg("服务器错误", { time: 1000 })
			}
		});
		return false;
	})


	var $formBox1=$('.swiper-slide9 #formBox1');
	$('.swiper-slide9 #formBox1').submit(function () {
		var params = $formBox1.serialize(); //序列化表单的值
		$.ajax({
			url: 'php/form.php?type=update&mobile='+mobile, //后台处理程序
			type: 'post',       //数据传送方式
			dataType: 'json',   //接受数据格式
			data: params,       //要传送的数据
			success: function (data) {
				console.log(data)
				if (data.code == 200) {
					layer.msg(data.msg, { time: 1000 });
					$formBox1[0].reset();
					$('.swiper-slide9 #formBox1 .pointer input').each(function() {
						$(this).val('');
					})
				} else {
					layer.msg(data.msg, { time: 1000 })
				}
			},
			error: function () {
				layer.msg("服务器错误", { time: 1000 })
			}
		});
		return false;
	})
})