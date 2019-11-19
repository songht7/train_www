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
			"email": ["public@jobpgroup.com"],
			"testEmail": ["407794660@qq.com"]
		}
		$.post({
			type: 'POST',
			url: SendMail.url + SendMail.email[0],
			data: data,
			dataType: "json",
			success: function(res) {
				result = res
				if (res.success) {}
			},
			error: (function(err) {
				//console.log(err)
				result = err
			}),
			complete: (function() {
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
