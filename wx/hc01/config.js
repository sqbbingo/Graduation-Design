(function (module){
        var exports = module.exports = {};
        //产品ID
        var productid = 194413;
        //产品密钥
        var secret = "Vt2rLag7l9LtcqUn7dT87psfxEY=";
        //设备ID
        var deviceid = 509113251;
        //鉴权信息
        var authinfo = "nodemcumq";
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
                                url_send_mqttdata:url_send_mqttdata
                }
        };
})(module);