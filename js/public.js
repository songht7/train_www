$(function() {
	$(".contact-input").focus(function() {
		$("#ErrTip").hide().html("");
	});
});

function sendMail() {
	var rule = [{
			name: "Name",
			checkType: "notnull",
			checkRule: "",
			errorMsg: "请填写姓名"
		}, {
			name: "Company",
			checkType: "notnull",
			checkRule: "",
			errorMsg: "请填写企业名称"
		},
		{
			name: "Phone",
			checkType: "phoneno",
			checkRule: "",
			errorMsg: "请填写正确的联系方式"
		}
	];
	//进行表单检查
	var _Name = $("#Name").val(),
		_Company = $("#Company").val(),
		_Phone = $("#Phone").val();
	var formData = {
		"Name": _Name,
		"Company": _Company,
		"Phone": _Phone,
	};
	var data = {
		"邮件来源": ".::职照服务平台用户留言::.",
		"姓名": formData.Name,
		"企业名称": formData.Company,
		"联系方式": formData.Phone,
		"留言": $("#Message").val()
	};
	var checkRes = graceChecker.check(formData, rule);
	console.log(formData)
	console.log(checkRes)
	if (checkRes) {
		var _this = this;
		var result = {};
		var SendMail = {
			"url": "http://www.spacehu.com/space/mail/mail.php?leo=",
			"email": ["Ke.xu@jobpgroup.com"],
			"testEmail": ["407794660@qq.com"]
		}
		$.post({
			type: 'POST',
			url: SendMail.url + SendMail.email[0],
			data: data,
			dataType: "json",
			success: function(res) {
				//console.log("post-suc：", res)
				result = res
				if (res.success) {
					$("#ErrTip").show().html("申请信息已提交至管理员！");
				} else {
					$("#ErrTip").show().html("申请失败，请重试！");
				}
			},
			error: (function(err) {
				//console.log("post-err：", err)
				$("#ErrTip").show().html("申请失败，请重试！");
				result = err
			}),
			complete: (function() {
				setTimeout(function() {
					$("#ErrTip").hide().html("");
				}, 2000)
				//console.log("complete");
			})
		});
	} else {
		$("#ErrTip").show().html(graceChecker.error);
		setTimeout(function() {
			$("#ErrTip").hide().html("");
		}, 2000)
	}
}
