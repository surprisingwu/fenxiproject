/**
 * Created by 巫运廷 on 2017/7/11.
 */

var appSettings = {};
appSettings.ip = "10.4.122.22";//融资租赁
appSettings.port = "8090";//融资租赁
appSettings.proxy = "http://"+appSettings.ip+":"+appSettings.port;
$_ajax = {
    _post: function (obj) {
        var paramsObj = {};
        summer.writeConfig({
            "host": appSettings.ip, //向configure中写入host键值
            "port": appSettings.port //向configure中写入port键值
        });
        paramsObj.viewid = obj.url;
        paramsObj.action = obj.handler;
        paramsObj.params = obj.data;
        paramsObj.header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "imgfornote"
        }
        paramsObj.callback = obj.success;
        paramsObj.error = obj.err;
        paramsObj.isalerterror = "true";
        summer.callAction(paramsObj);
    },
    _get: function (obj) {
        var paramsObj = {};
        summer.writeConfig({
            "host": appSettings.ip, //向configure中写入host键值
            "port": appSettings.port //向configure中写入port键值
        });
        paramsObj.viewid = obj.url;
        paramsObj.action = obj.handler;
        paramsObj.params = obj.data;
        paramsObj.header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "imgfornote"
        }
        paramsObj.callback = obj.success;
        paramsObj.error = obj.err;
        summer.callAction(paramsObj);
    },
}
//点击返回上一页
$.fn.extend({
    turnBackLastPage: function (path) {
        $(this).on("click",function () {
            window.location.href = path;
        })
    }
})
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
$.extend({
    setTotastText: function(obj) {
        //先进行初始化
        init();
        var totastContentBottomText = $("#totast .totastContentBottomText");
        var $totast = $("#totast");
        var text = obj.text || "没有获取到数据！";
        totastContentBottomText.html(text);
        $totast.show();
        $("#totast .confirmBtn").on("click", function() {
            $totast.hide();
            offBindEvent();

        })
        $("#closeTotast").on("click", function() {
            $totast.hide();
            offBindEvent();
        })
        //进行初始化，添加html
        function init() {
            if ($("body").find("#totast").length > 0) {
                return;
            }
            $("body").append('<style>' +
                '#totast {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);z-index: 999;}' +
                '#closeTotast {height: 100%;width: 100%;}' +
                '#totastContent {position: absolute;width: 70%;height: 128px;background-color: #fff;top: 50%;left: 50%;transform: translate(-50%, -50%);border-radius: 5px;}' +
                '#totastContentTitle {width: 100%;font-size: 17px;background-color: rgb(114, 209, 255);height: 36px;line-height: 0.96rem;padding-left: 20px;border-radius: 5px 5px 0 0;}' +
                '.totastContentTitleText {   color: #fff;}' +
                '#totastContentBottom {    padding-top: 14px;font-size: 16px;}' +
                '.totastContentBottomText {   text-align: center;color: rgb(115, 189, 217);margin-bottom: 14px;}' +
                '#totastContentBottom .confirmBtn {   display: block;border: none;outline: none;height: 40px;width: 100%;line-height: 40px;text-align: center;border-top: 1px solid #F7F7F7;color: rgb(115, 189, 217);background: #fff;font-size: 16px;border-radius: 0 0 5px 5px;}'+
                    '</style>'
            )
            var htmlStr = '<div id="totast" style="display: none">' +
                '<div id="closeTotast"></div>' +
                '<div id="totastContent">' +
                '<div id="totastContentTitle">' +
                '<span class="totastContentTitleText">提示</span>' +
                '</div>' +
                '<div id="totastContentBottom">' +
                '<p class="totastContentBottomText">没有获取到数据！</p>' +
                '<button class="confirmBtn">确定</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            $("body").append(htmlStr);
        }
        //对一些时间进行解绑
        function offBindEvent() {
            $("#totast .confirmBtn").off()
            $("#closeTotast").off();
        }
    },
})