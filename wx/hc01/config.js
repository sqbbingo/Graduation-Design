(function (module){
        var exports = module.exports = {};
        //产品ID
        var productid = 194413;
        //产品密钥
        var secret = "Vt2rLag7l9LtcqUn7dT87psfxEY=";
        //设备ID
        var deviceid = 516161018;
        //鉴权信息
        var authinfo = "bs01";
        //根域名
        var url = "https://api.heclouds.com/";
        //根域名+设备
        var url_devic = url + 'devices/' + deviceid;
        //上传数据点url
        var url_send_data = url_devic + '/datapoints';
        //发布消息
        var url_send_mqttdata = url + 'mqtt?topic=';
        //请求的头部
        var header = {
                        'Content-Type': 'application/json',
                        "api-key": "Vt2rLag7l9LtcqUn7dT87psfxEY=",
        }
        //向onenet发送publish数据
        var PublishTheme = function(theme,state){
                wx.request({
                                method:'POST',
                                url:'https://api.heclouds.com/mqtt?topic=' + theme,         //publish主题
                                data: {
                                        "message":state
                                },
                                header:header,
                                success: function(res) {        //调用成功后的回调函数
                                }
                        })
        }

        module.exports = {
                config:{
                                productid:productid,
                                secret:secret,
                                deviceid:deviceid,
                                authinfo:authinfo,
                                url:url,
                                header:header,
                                url_devic:url_devic,
                                url_send_data:url_send_data,
                                url_send_mqttdata:url_send_mqttdata,
                                PublishTheme:PublishTheme
                }
        };
})(module);