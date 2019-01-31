var config = require('../../../config.js');        //导入配置文件

Page({
        data:{
                array: ['无操作','关闭一次','连续关闭', '开启一次', '连续开启'],
                message:{
                        wifi:{
                            ssid:["wf","nodemcu"],
                            pwd:["su666688886","12345678"]
                        },
                        sysLed:{
                            state:1,
                            time:500,
                            brightness:50
                        },
                        mqtt:{
                            productId:"194413",
                            apiKey:"Vt2rLag7l9LtcqUn7dT87psfxEY=",
                            deviceId:"516161018",
                            authInfo:"bs01",
                            subscribe:["sysLed","/room1/ws2812","/room1/led1"]
                        },
                        ws2812:{
                            state:0,
                            rgb:[10,10,10],
                            index:[0,0,0,0,0],
                            time:["00:00","00:00","00:00","00:00","00:00"]
                        },
                        led2:{
                            state:0,
                            brightness:0,
                            index:[0,0,0,0,0],
                            time:["00:00","00:00","00:00","00:00","00:00"]
                        }   
                }
        },

        //确认按钮，更新灯的状态
        button_ok(e) {
                var self = this;
                
                config.config.PublishTheme("/room2/led2",self.data.message.led2);
                wx.navigateTo({
                        url: '/pages/led/led',
                })              //跳转到led界面
        },

        // 取消按钮-直接跳转到主页
        button_cancel(e) {
                wx.navigateTo ({
                        url: '/pages/led/led',
                })              //跳转到led界面
        },

        //页面加载函数
        onLoad:function(options){
                var self = this;
                //设备各模块状态查询
                wx.request({
                        url:'https://api.heclouds.com/devices/' + config.config.deviceid2 + '/datastreams',
                        data:{},
                        header: config.config.header,   //请求头部
                        success: function(res) {        //调用成功后的回调函数
                                console.log(res);
                                // console.log(res.data.data.length);
                                for (var i = res.data.data.length - 1; i >= 0; i--) {
                                        if (res.data.data[i].id == "led2") {
                                                self.setData({
                                                        'message.led2':res.data.data[i].current_value
                                                })
                                        }
                                }
                        }
                })
        },
        //led2亮度调节
        slider4change:function (e) {
                this.setData({
                        'message.led2.brightness':e.detail.value
                })
        },

        //定时器调节记录函数0
        bindTimeChange0: function (e) {
                console.log('picker发送选择改变，id值为', e)

                this.setData({
                        'message.led2.time[0]':e.detail.value
                })
        },
        bindPickerChange0: function (e) {    //定时器状态调节
                console.log(e)
                this.setData({
                        'message.led2.index[0]': e.detail.value
                })
        },
        //定时器调节记录函数1
        bindTimeChange1: function (e) {
                this.setData({
                        'message.led2.time[1]':e.detail.value
                })
        },
        bindPickerChange1: function (e) {    //定时器状态调节
                this.setData({
                        'message.led2.index[1]': e.detail.value
                })
        },
        //定时器调节记录函数2
        bindTimeChange2: function (e) {
                this.setData({
                        'message.led2.time[2]':e.detail.value
                })
        },
        bindPickerChange2: function (e) {    //定时器状态调节
                this.setData({
                        'message.led2.index[2]': e.detail.value
                })
        },
        //定时器调节记录函数3
        bindTimeChange3: function (e) {
                this.setData({
                        'message.led2.time[3]':e.detail.value
                })
        },
        bindPickerChange3: function (e) {    //定时器状态调节
                this.setData({
                        'message.led2.index[3]': e.detail.value
                })
        },

        onReady:function(){
                
        },
        onShow:function(){
                
        },
        onHide:function(){
                
        },
        onUnload:function(){
                
        },
        onPullDownRefresh:function(){
                
        },
        onReachBottom:function(){
                
        }
})                