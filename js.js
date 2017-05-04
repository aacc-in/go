if ('OVER' != getCookie("FIRSTTIME")) {
	setCookie("_B", "http://www.baidu.com");
	setCookie("_G", "http://www.google.com/ncr");
	setCookie("_Q", "http://www.qq.com");
	setCookie("_T", "http://www.tmall.com");
	setCookie("_V", "http://www.v2ex.com");
	setCookie("_F", "http://www.fuliba.net");
	setCookie("_W", "http://www.weibo.com");
	setCookie("_Y", "http://www.youku.com");
	setCookie("FIRSTTIME", "OVER")
};
var urlcache = {};
for (var i = 48; i <= 90; i++) {
	var code = String.fromCharCode(i);
	var v = getCookie("_" + code);
	if (v != null && v != '' && typeof(v) != 'undefined') {
		urlcache[code] = v;
		$("#LI_" + code).prepend('<img id="' + code + '" class="fav" src="' + getico(v) + '" align="center">')
	}
};
$(document).keyup(function(a) {
	if (a.ctrlKey) {
		return false
	}
	var b = String.fromCharCode(a.keyCode);
	$("#LI_" + b).css('background', '#ccf');
	setTimeout('$("#LI_' + b + '").css("background","#fff");', 300);
	if (urlcache[b] == '' || typeof(urlcache[b]) == 'undefined') {
		$("#message").html('找不到这个按键的配置,注意切换您的输入法哦~~~');
		setTimeout('$("#message").html("");', 2000)
	} else {
		window.location.href = urlcache[b]
	}
});
$("#main li").mouseenter(function() {
	$("#tempdate").val($(this).attr('id').replace("LI_", ""));
	$(this).append('<div class="oper"><span><a onclick="del()" class="del" title="删除"><img src="images/delete-icon.png"></a></span><span><a onclick="update()" class="edit" title="编辑"><img src="images/edit-icon.png"></a></span></div>')
}).mouseleave(function() {
	$("#tempdate").val('');
	$(".oper").remove()
});
$("#main li").click(function() {
	var a = $(this).attr('id').replace('LI_', '');
	if (urlcache[a] == '' || typeof(urlcache[a]) == 'undefined') {} else {
		window.location.href = urlcache[a]
	}
});

function del() {
	var a = $("#tempdate").val();
	urlcache[a] = '';
	$("#" + a).remove();
	deleteCookie("_" + a);
	return false
};

function update() {
	var a = $("#tempdate").val();
	$("#LI_" + a).css('background', '#ccf');
	var u = window.prompt("请输入键位[" + a + "]对应的网站地址", "");
	$("#LI_" + a).css('background', '#fff');
	if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1) {
		u = 'http://' + u
	};
	if (!IsURL(u)) {
		alert('网站地址输入错误!请核对');
		return
	};
	urlcache[a] = u;
	$("#" + a).remove();
	$("#LI_" + a).prepend('<img id="' + a + '" class="fav" src="' + getico(u) + '" align="center">');
	setCookie("_" + a, u);
	return false
};

function getico(a) {
	var s = a.indexOf("//");
	temp = a.substring(s + 2);
	var b = temp.indexOf("/");
	if (b == -1) {
		b = temp.length
	};
	return a.substring(0, b + s + 2) + '/favicon.ico'
};

function setCookie(a, b, c, d, e) {
	var f = new Date();
	f.setTime(f.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
	document.cookie = a + "=" + escape(b) + ((f) ? "; expires=" + f.toGMTString() : "") + "; path=/"
};

function deleteCookie(a) {
	expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000));
	setCookie(a, "", expdate)
};

function getCookie(a) {
	var b = document.cookie;
	a += "=";
	var i = 0;
	while (i < b.length) {
		var c = i + a.length;
		if (b.substring(i, c) == a) {
			var d = b.indexOf(";", c);
			if (d == -1) d = b.length;
			return decodeURIComponent(b.substring(c, d))
		};
		i = b.indexOf(" ", i) + 1;
		if (i == 0) break
	};
	return
};

function IsURL(a) {
	var b = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var c = new RegExp(b);
	return !!c.test(a)
};