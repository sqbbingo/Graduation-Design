var config = require('../../config.js');        //导入配置文件

function sys_state_timer_calback(self)
{
        // console.log(config.config.header);
        //设备是否在线查询
        wx.request({
                                url:'https://api.heclouds.com/devices' + '?online=true&amp',         //服务器地址
                                data: {},
                                header: config.config.header,   //请求头部
                                success: function(res) {        //调用成功后的回调函数
                                        // console.log(res);
                                        if(res.data.data.devices.length > 0){
                                                self.setData({
                                                        online_state_imag:'/images/online.png',
                                                        online_state_text:"在线"
                                                })
                                        }else{
                                              self.setData({
                                                        online_state_imag:'/images/offline.png',
                                                        online_state_text:"离线"
                                                })  
                                        }
                                        
                                }
                        })
        //设备room1各模块状态查询
        wx.request({
                url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
                data:{},
                header: config.config.header,   //请求头部
                success: function(res) {        //调用成功后的回调函数
                        console.log(res);
                        for (var i = res.data.data.length - 1; i >= 0; i--) {
                               if (res.data.data[i].id == "sysLed"){
                                    self.setData({
                                            'message.sysLed':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "led2") {
                                    self.setData({
                                            'message.led2':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "mqtt") {
                                    self.setData({
                                            'message.mqtt':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "wifi") {
                                    self.setData({
                                            'message.wifi':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "ws2812") {
                                    self.setData({
                                            'message.ws2812':res.data.data[i].current_value
                                    })
                               }
                        }  
                }
        })

        //设备room2各模块状态查询
        wx.request({
                url:'https://api.heclouds.com/devices/' + config.config.deviceid2 + '/datastreams',
                data:{},
                header: config.config.header,   //请求头部
                success: function(res) {        //调用成功后的回调函数
                        console.log(res);
                        for (var i = res.data.data.length - 1; i >= 0; i--) {
                               if (res.data.data[i].id == "sysLed"){
                                    self.setData({
                                            'message2.sysLed':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "led2") {
                                    self.setData({
                                            'message2.led2':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "mqtt") {
                                    self.setData({
                                            'message2.mqtt':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "wifi") {
                                    self.setData({
                                            'message2.wifi':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "ws2812") {
                                    self.setData({
                                            'message2.ws2812':res.data.data[i].current_value
                                    })
                               }
                        }    
                }
        })
}

Page({
        data:{
                //room1-大厅 
                var1:"开",
                ischecked1:false,
                led1_state:"大厅全彩灯",

                var2:"关",
                ischecked2:false,
                led2_state:"大厅普通灯",
                online_state_imag:'/images/offline.png',
                online_state_text:"离线",
                // room2
                room2var1:"开",
                room2ischecked1:false,
                room2led1_state:"room2全彩灯",

                room2var2:"关",
                room2ischecked2:false,
                room2led2_state:"room2普通灯",

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
                },
                message2:{
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
                            deviceId:"510461991",
                            authInfo:"nodemcu02",
                            subscribe:["sysLed","/room2/ws2812","/room2/led1"]
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
        // 按钮1状态改变
        switch1Change: function(e){
                var self = this;
                console.log('switch1 发生 change 事件，携带值为',e.detail.value)
                console.log(e.detail);
                this.setData({
                        var1:e.detail.value?"开":"关",
                        'message.ws2812.state':e.detail.value?1:0
                })
                config.config.PublishTheme("/room1/ws2812",self.data.message.ws2812);
        },
        // 按钮2状态改变
        switch2Change: function(e){
                var self = this;
                console.log('switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        var2:e.detail.value?"开":"关",
                        'message.led2.state':e.detail.value?1:0
                })

                config.config.PublishTheme("/room1/led2",self.data.message.led2);
        },
        // room2按钮1状态改变
        room2switch1Change: function(e){
                var self = this;
                console.log('room2 switch1 发生 change 事件，携带值为',e.detail.value)
                console.log(e.detail);
                this.setData({
                        room2var1:e.detail.value?"开":"关",
                        'message2.ws2812.state':e.detail.value?1:0
                })
                config.config.PublishTheme("/room2/ws2812",self.data.message2.ws2812);
        },
        // room2按钮2状态改变
        room2switch2Change: function(e){
                var self = this;
                console.log('room2 switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        room2var2:e.detail.value?"开":"关",
                        'message2.led2.state':e.detail.value?1:0
                })

                config.config.PublishTheme("/room2/led2",self.data.message2.led2);
        },
        //页面载入
        onLoad:function(options){
                var self = this;
                console.log("加载页面");
                sys_state_timer_calback(self);
                var sys_state_timer = setInterval(sys_state_timer_calback,5000,self); //每10秒查询一次设备的状态
        },
        //dht
        button_dht:function(){
            
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



