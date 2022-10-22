//var apiHost = 'http://localhost:80';
//var apiHost = "http://101.42.222.167"
//var apiHost = "http://xiaoyang.asia"
// var apiHost = "http://192.168.3.32:80";
var apiHost = "https://laf.4w3w.com"
//var apiHost = "http://192.168.43.122";

//yang
//var apiHost = "http://192.168.3.104:80";


var tokenKey = 'token'; // 登录地址, 根据这个地址来设置token

var logInUrl = '/wx/api/login/check'; // 例外不用token的地址

var exceptionAddrArr = [
	//index
	'/wx/api/release/select',
	'/wx/api/announce/list',
	'/wx/api/category/treeData',
	'/wx/api/release/list', // list_detail
	'/wx/api/info/list',
	'/wx/api/info/comments', //user
	'/wx/api/login/check'
];
var authenAddArr = [];

function getHost() {
	return apiHost;
}
/**
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */

function getRequest(url, data, success, fail) {
	CreateHeader(url, function(header) {
		wx.request({
			url: apiHost + url,
			method: 'GET',
			data: data,
			header: header,
			success: function(res) {
				if (success && typeof success === 'function') {
					success(res);
				}
			},
			fail: function(error) {
				if (fail && typeof fail === 'function') {
					fail(error);
				} else {
					// console.log(error);
				}
			}
		});
	});
}
/**
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */

function postRequest(url, data, success, fail) {
	CreateHeader(url, function(header) {
		wx.request({
			url: apiHost + url,
			method: 'POST',
			data: data,
			header: header,
			success: function(res) {
				if (url === logInUrl) {
					wx.setStorage({
						key: tokenKey,
						data: res.data.token
					});
					wx.setStorage({
						key: 'userInfo',
						data: res.data.object
					});
				}

				if (success && typeof success === 'function') {
					success(res);
				}
			},
			fail: function(error) {
				if (fail && typeof fail === 'function') {
					fail(error);
				} else {
					// console.log(error);
				}
			}
		});
	});
}
/**
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */

function CreateHeader(url, complete) {
	var header = {
		'content-type': 'application/json'
	};

	if (exceptionAddrArr.indexOf(url) == -1) {
		//排除请求的地址不需要token的地址
		wx.getStorage({
			key: tokenKey,
			success: function(res) {
				header.token = res.data;
			},
			fail: function(error) {
				// console.log(error);
			},
			complete: function() {
				complete && typeof complete === 'function' ? complete(header) : null;
			}
		});
	} else {
		complete && typeof complete === 'function' ? complete(header) : null;
	}
}

module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.getHost = getHost;
